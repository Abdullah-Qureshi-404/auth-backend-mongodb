const { body, validationResult } = require("express-validator");

const loginValidationRules = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation error" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error during validation" });
  }
};

module.exports = [...loginValidationRules, validate];
