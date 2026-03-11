const jwt = require("jsonwebtoken");
const sendForgotPasswordEmail = require("../services/emailService");
const User = require("../models/users.js"); 

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await sendForgotPasswordEmail(user.email, resetLink);

    res.status(200).json({ message: "Reset password link sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
