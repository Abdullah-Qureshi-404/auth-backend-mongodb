const express = require("express");
const router = express.Router();
const verify = require("../middleware/verification.js");
const updateValidator = require("../validators/updateProfile.js");
const { updateProfileController } = require("../controllers/updateProfileController.js");

router.get("/dashboard", verify, (req, res) => {
console.log(req.user);
  res.json({
    message: "Welcome to the dashboard!",
    user: req.user, 
  });
});


router.post("/updateProfile", verify,updateValidator, updateProfileController);

module.exports = router;
