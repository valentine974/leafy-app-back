const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Request = require("../models/Request.model");

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

  User.findById(requester)
    .populate("companyId")
    .then((foundUser) => {
      const { validators } = foundUser;
      let validations = []
      validators.map((validator) => validations.push({validatorId: validator, approved:false}));
      console.log(validations)
      const daysLeft = foundUser.companyId.numberOfVacationDays; //to be refined with vacation day calculation
      // add if condition daysleft > demanded days
      if (true) {
        Request.create({
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
        });
      }
    })
    .catch((err) => console.log("error in payload._id", err));
});


router.get("/requests", (req,res,next)=>{
    Request.find()
    .then(requests=> res.json(requests))
    .catch(err=>console.log("err in retrieving the Request", err))
  })

router.get("/requests/:id", (req,res,next)=>{
    Request.findById(req.params.id)
    .then(request=> res.json(request))
    .catch(err=>console.log("err in retrieving the Request", err))
  })
  
router.put("/requests/:id", (req, res, next)=>{
      const {
        isFullDay,
        startDate,
        morningAfternoonStart,
        endDate,
        morningAfternoonEnd,
        comments,
        validations,
      } = req.body;
      Request.findByIdAndUpdate(
        req.params.id,
        {
          isFullDay,
          startDate,
          morningAfternoonStart,
          endDate,
          morningAfternoonEnd,
          comments,
          validations,
        },
        { new: true }
      )
        .then((request) => res.json(request))
        .catch((err) => console.log("err in updating Request", err));
  })
  
  router.delete("/requests/:id", (req, res, next)=>{
      Request.findByIdAndRemove(req.params.id)
      .then(()=>res.json("Request deleted"))
      .catch(err=>console.log("err in deleting Request", err))
  })


module.exports = router;
