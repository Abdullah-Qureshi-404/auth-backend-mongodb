const User = require("../models/users.js");
const generateToken = require("../utils/jwt");
const bcrypt = require("bcrypt");

exports.signupServices = async ({ username, email, password }) => {
  try {
    const presentUser = await User.findOne({ email });
    if (presentUser) {
      throw { code: 409, message: "User with this email already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const token = generateToken(newUser);

    return {
      message: "User has been saved successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    };
  } catch (error) {
    throw { code: error.code, message: error.message || "Signup failed" };
  }
};

exports.userLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw { code: 404, message: "User not found with given email." };
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      throw { code: 401, message: "Incorrect password" };
    }

    const token = generateToken(user);

    return {
      message: "User login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    throw { code: error.code, message: error.message || "Login failed" };
  }
};
exports.resetServices = async function ({
  oldPassword,
  newPassword,
  confirmPassword,
  userId,
}) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw { code: 404, message: "User not found with given ID." };
    }

    const isCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isCorrect) {
      throw { code: 401, message: "Incorrect old password" };
    }

    if (newPassword !== confirmPassword) {
      throw {
        code: 400,
        message: "New password and confirm password do not match",
      };
    }

    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    user.password = hashPassword;
    await user.save();

    return { code: 200, message: "Password Updated!" };
  } catch (error) {
    throw {
      code: error.code,
      message: error.message || "Error while resetting password",
    };
  }
};

exports.updateProfile = async function ({
  userId,
  username,
  address,
  city,
  country,
}) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw { code: 404, message: "User with this ID not found" };
    }

    if (city === user.city) {
      throw { message: "To update city should be different" };
    }
    if (address === user.address) {
      throw { message: "To update address should be different" };
    }
    if (country === user.country) {
      throw { message: "To update country should be different" };
    }
    if (username === user.username) {
      throw { message: "To update username should be different" };
    }
    user.username = username;
    user.address = address;
    user.city = city;
    user.country = country;
    await user.save();

    return {
      code: 200,
      message: "Profile Updated!",
      user: {
        username: user.username,
        address: user.address,
        city: user.city,
        country: user.country,
      },
    };
  } catch (error) {
    throw {
      code: error.code,
      message: error.message || "Error while Updating Profile",
    };
  }
};


