const { userLogin, resetServices } = require("../services/authServices.js");

exports.login = async function (req, res) {
  const { email, password } = req.body;
  try {
    const result = await userLogin({ email, password });
    res.status(200).json(result);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(err.code).json({code: err.code, message: err.message });
  }
};

exports.resetPassword = async function (req, res) {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id;
  try {
    let updated = await resetServices({
      oldPassword,
      newPassword,
      confirmPassword,
      userId,
    });
    

    res.status(updated.code).json({ message: updated.message });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};
