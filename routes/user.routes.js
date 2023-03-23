const express = require("express");
const router = express.Router();
const User = require("../models/User.model")

router.get("/users", (req,res,next)=>{
    User.find()
    .then(users=> res.json(users))
    .catch(err=>console.log("err in retrieving users", err))
})
router.get("/users/:id", (req,res,next)=>{
  User.findById(req.params.id)
  .then(user=> res.json(user))
  .catch(err=>console.log("err in retrieving the user", err))
})

router.put("/users/:id", (req, res, next)=>{
    const {email, name, surname, contractStartDate, position, companyId, validators} = req.body
    User.findByIdAndUpdate(req.params.id,{email, name, surname, contractStartDate, position, companyId, validators}, {new:true})
    .then(user=>res.json(user))
    .catch(err=>console.log("err in updating user", err))
})

router.delete("/users/:id", (req, res, next)=>{
    User.findByIdAndRemove(req.params.id)
    .then(()=>res.json("user deleted"))
    .catch(err=>console.log("err in deleting user", err))
})

module.exports = router;