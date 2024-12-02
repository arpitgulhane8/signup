const express = require("express");
const router = express.Router();
const {
  register,
  login,
} = require("../controllers/authController.js");

// Register route
router.post("/register", register);

// login route
router.post("/login", login);


module.exports = router;