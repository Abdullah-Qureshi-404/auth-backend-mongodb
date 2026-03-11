const express = require("express");
const router = express.Router();
const signupValidator = require("../validators/signupValidator.js");
const signupController = require("../controllers/signupController.js");
const emailController = require("../controllers/emailController.js");


router.post("/signup",signupValidator, signupController.signup);


router.post("/forgotPassword", emailController.forgotPassword);

module.exports = router;