const { body, validationResult } = require("express-validator");

const resetValidation = [
  body("oldPassword").notEmpty().withMessage("Password Field should filled "),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isStrongPassword()
    .withMessage("newPassword should be strong"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("confirm password should be same as new password");
      }
      return true;
    }),
];

const validateReset = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ code: 400, errors: errors.array() });
    }
    next();
  } catch (err) {
    return res.status(500).json({ code: 500, message: "Validation failed" });
  }
};

module.exports = [...resetValidation, validateReset];
