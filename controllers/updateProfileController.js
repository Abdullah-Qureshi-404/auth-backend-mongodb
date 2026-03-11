const { updateProfile } = require("../services/authServices.js");

exports.updateProfileController = async function (req, res) {
  const { username, address, city, country } = req.body;

  try {
    const userId = req.user.id;

    const result = await updateProfile({
      userId,
      username,
      address,
      city,
      country,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message });
  }
};
