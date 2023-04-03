const express = require("express");
const router = express.Router();
const Company = require("../models/Company.model")


router.post("/create-company", (req,res,next)=>{
    const {name, address, siret,numberOfVacationDays, imageUrl} = req.body

    Company.findOne({ siret })
    .then((foundCompany) => {
      // If the user with the same email already exists, send an error response
      if (foundCompany) {
        res.status(400).json({ message: "Company already exists." });
        return;
      }
      return Company.create({ name, address, siret, numberOfVacationDays, imageUrl })
      .then(()=>res.json("new company created"));
    })
    .catch(err=>console.log("err in creating company", err))
})

router.get("/companies", (req,res,next)=>{
    Company.find()
    .then(companies=> res.json(companies))
    .catch(err=>console.log("err in retrieving companies", err))
})

router.get("/companies/:id", (req,res,next)=>{
  Company.findById(req.params.id)
  .then(company=> res.json(company))
  .catch(err=>console.log("err in retrieving the company", err))
})

router.put("/companies/:id", (req, res, next)=>{
    const {name, address, siret,numberOfVacationDays, imageUrl} = req.body
    Company.findByIdAndUpdate(req.params.id,{name, address, siret,imageUrl,numberOfVacationDays}, {new:true})
    .then(company=>res.json(company))
    .catch(err=>console.log("err in updating company", err))
})

router.delete("/companies/:id", (req, res, next)=>{
    Company.findByIdAndRemove(req.params.id)
    .then(company=>res.json("company deleted"))
    .catch(err=>console.log("err in deleting company", err))
})

module.exports = router