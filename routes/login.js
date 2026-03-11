const express = require("express");
const router = express.Router();
const loginValidator = require("../validators/loginValidator.js");
const loginController = require("../controllers/loginController");
const resetValidator = require("../validators/resetValidator.js");
const verify = require("../middleware/verification.js");

router.post("/login", loginValidator, loginController.login);
router.post("/login/resetPassword",verify,resetValidator, loginController.resetPassword);

module.exports = router;
