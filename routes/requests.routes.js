const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User =require('../models/User.model');

const Request =require('../models/Request.model');


router.post("/new-request",(req,res,next)=>{
    const {isFullDay, startDate, morningAfternoonStart, endDate, morningAfternoonEnd, comments} = req.body

    User.findById(req.payload._id)
    .then((foundUser)=>{res.json(foundUser)})
    .catch((err)=>(console.log(err)))
    // Request.create()
})
 
module.exports = router