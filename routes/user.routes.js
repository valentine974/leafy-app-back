const express = require("express");
const router = express.Router();
const User = require("../models/User.model")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const fileUploader = require("../config/cloudinary.config");

router.get("/users", (req,res,next)=>{
    User.find()
    .then(users=> res.json(users))
    .catch(err=>console.log("err in retrieving users", err))
})
router.get("/users/:id", (req,res,next)=>{
  User.findById(req.params.id)
  .populate("companyId")
  .then(user=> res.json(user))
  .catch(err=>console.log("err in retrieving the user", err))
})


//update user profile picture
router.post("/upload", fileUploader.single("profilePictureUrl"), (req, res, next) => {
  if(!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  console.log({ secure_url: req.file.path })
  res.json({ secure_url: req.file.path });
})

//update user profile info
router.put("/users/:id", (req, res, next)=>{
    const {email, name, surname, contractStartDate, position, companyId, validators, profilePictureUrl} = req.body
    User.findByIdAndUpdate(req.params.id,{email, name, surname, contractStartDate, position, companyId, validators, profilePictureUrl}, {new:true})
    .then(user=>res.json(user))
    .catch(err=>console.log("err in updating user", err))
})


router.put("/users/:id/modify-password", (req,res,next)=>{
    const {password} = req.body
   
    if (password === "" ) {
      res.status(400).json({ message: "Provide a new password" });
      return;
    }
  
    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

  
    // Check the users collection if a user with the same email already exists
    User.findByIdAndUpdate(req.params.id, {password:hashedPassword,isNewEmployee:false}, {new:true})
      .then((updatedUser) => {
        res.json(updatedUser)
       })
      .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
  
})



router.delete("/users/:id", (req, res, next)=>{
    User.findByIdAndRemove(req.params.id)
    .then(()=>res.json("user deleted"))
    .catch(err=>console.log("err in deleting user", err))
})

module.exports = router;