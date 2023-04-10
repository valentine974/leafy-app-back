const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;





// POST /auth/signup  - Creates a new user in the database
router.post("/create-user", (req, res, next) => { // ADD THE MIDDLE WARE and verif for creating profile only for HRs
  const { email, name, surname, contractStartDate, validators, isNewEmployee, position, companyId } = req.body;
  const password = "Azerty1"

  if (email === "" ||  name === "" || surname === "" || contractStartDate === "" || position === "" || companyId === "" ) {
    res.status(400).json({ message: "Provide email, position, companyId, name and surname" });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }



  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const defaultImage="https://www.123-stickers.com/6799-thickbox/stickers-sticker-tete-mickey-clin-d-oeil.jpg"

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword, name, surname, contractStartDate,validators, isNewEmployee: true, position, companyId, imageUrl:defaultImage  });
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id, isNewEmployee, companyId,position, imageUrl,contractStartDate } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id, isNewEmployee, companyId, position, imageUrl,contractStartDate };
      sendEmail(name, email, "Welcome to the LEAFY", "use the attached link to login your account.", "registration");
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect ) {
        // Deconstruct the user object to omit the password
        const { _id, email, name, isNewEmployee, companyId, position,imageUrl, contractStartDate} = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name, isNewEmployee, companyId,imageUrl, position,contractStartDate}; 

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});



module.exports = router;
