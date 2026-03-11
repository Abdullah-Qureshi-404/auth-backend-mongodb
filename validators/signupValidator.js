
const { body, validationResult } = require("express-validator");


const signupValidationRules = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isStrongPassword()
    .withMessage("Password must be valid and strong"),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = [...signupValidationRules, validate];
