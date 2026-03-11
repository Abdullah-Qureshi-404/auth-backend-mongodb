const { signupServices , forgotPassword }= require("../services/authServices.js");

exports.signup = async function (req, res) {
  const { username, email, password } = req.body;

  try {
    let result = await signupServices({ username, email, password });
    res.status(201).json(result);
  } catch (err) {
    console.log("signup error: ", err.message);
    res.status(500).json({ message: err.message });
  }
};



