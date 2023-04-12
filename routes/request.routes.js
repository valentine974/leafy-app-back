const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Request = require("../models/Request.model");
const differenceInBusinessDays = require('date-fns/differenceInBusinessDays')
const sendEmail = require("../utils/sendEmail");

router.post("/user/create-request", (req, res, next) => {
  const {
    status,
    approvalLimitDate,
    isFullDay,
    startDate,
    morningAfternoonStart,
    endDate,
    morningAfternoonEnd,
    requester,
    comments,
  } = req.body;
  let duration = differenceInBusinessDays(new Date(endDate), new Date(startDate)) + 1
  if(morningAfternoonStart === "afternoon") duration -= 0.5
  if(morningAfternoonEnd === "morning") duration -= 0.5
  
  console.log("received approval limite date", approvalLimitDate)
  User.findById(requester)
    .populate("companyId")
    .then((foundUser) => {
      const { validators } = foundUser;
      console.log(validators)
      let validations = []
      validators.map((validator) => validations.push({validatorId: validator, status:"pending"}));
      
        Request.create({
          duration,
          status,
          approvalLimitDate,
          isFullDay,
          startDate,
          morningAfternoonStart,
          endDate,
          morningAfternoonEnd,
          comments,
          validations,
          requester,
        })
        .then((request)=> res.json(request))
        .catch((err)=>('err in sending the request', err))
    }) 
    .catch((err) => console.log("error in payload._id", err));
});

router.get("/requests", (req,res,next)=>{
    Request.find()
    .populate("requester validations.validatorId")
    .then(requests=> res.json(requests))
    .catch(err=>console.log("err in retrieving the Request", err))
  })

router.get("/user/:id/requests", (req,res,next)=>{
    Request.find({requester: req.params.id})
    .populate("requester validations.validatorId")
    .then(requests=> res.json(requests))
    .catch(err=>console.log("err in retrieving the Request", err))
})

router.get("/request/:id", (req,res,next)=>{
    Request.findById(req.params.id)
    .populate("requester validations.validatorId")
    .then(request=> res.json(request))
    .catch(err=>console.log("err in retrieving the Request", err))
  })
  
router.put("/request/:id/settings", (req, res, next)=>{
      const {
        isFullDay,
        startDate,
        morningAfternoonStart,
        endDate,
        morningAfternoonEnd,
        comments,
        validations,
      } = req.body;
      
      let status = "pending"
/*       console.log("validations:",validations) */
      /* status is now treated on the fron end */
      if(validations && validations.every((validation) => validation.status === "approved")) {
        status = "approved"
      }
      if(validations && validations.some((validation) => validation.status === "rejected")) status = "rejected"

      /* console.log("isFullDay", isFullDay, "startDate", startDate, "morningAfternoonStart", morningAfternoonStart, "endDate", endDate, "morningAfternoonEnd", morningAfternoonEnd, "comments", comments, "validations", validations, "status", status)
       */
      Request.findByIdAndUpdate(
        req.params.id,
        {
          isFullDay,
          status,
          startDate,
          morningAfternoonStart,
          endDate,
          morningAfternoonEnd,
          comments,
          validations,
        },
        { new: true }
      )
        .then((request) => {
          // requester is not populated here, so we can't retrive email addresse here.
          // const {name, email,status} = request.requester
          // if(status === "approved") sendEmail(name,email, "request approved", "your request for vacation has been proved", "approval")
          // if(status === "rejected") sendEmail(name,email, "request denied", "your request for vacation has been denied", "rejection")
          // console.log(request)
          res.json(request)})
        .catch((err) => console.log("err in updating Request", err));
  })
  
  router.delete("/request/:id", (req, res, next)=>{
      Request.findByIdAndRemove(req.params.id)
      .then(()=>res.json("Request deleted"))
      .catch(err=>console.log("err in deleting Request", err))
  })


module.exports = router;
