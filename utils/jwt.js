const jwt = require("jsonwebtoken");

console.log("Expires in:", process.env.JWT_EXPIRES_IN);

const generateToken = (user) => {
  try {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw { code: 500, message: "Cannot find secret key or expires key" };
    }

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (err) {
    throw {
      code: err.code,
      message: "Token generation failed: " + err.message,
    };
  }
};

module.exports = generateToken;

