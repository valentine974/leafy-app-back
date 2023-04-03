const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


//update picture
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if(!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ image_url: req.file.path });
})

module.exports = router;
