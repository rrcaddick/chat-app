const path = require("path");
const fs = require("fs/promises");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    file: { path: tempImagePath },
    body: { name, email, password },
  } = req;

  const targetPath = path.join(
    __dirname,
    "..",
    "assets",
    "images",
    "profile-pictures",
    `${path.basename(tempImagePath)}`
  );

  if (tempImagePath) {
    try {
      await fs.rename(tempImagePath, targetPath);
    } catch (error) {
      await fs.unlink(tempImagePath);
      res.status(401);
      throw new Error("Unable to save profile picture");
    }
  }
  const profilePicture = tempImagePath ? `/profile-pictures/${path.basename(tempImagePath)}` : undefined;

  const user = await User.create({ name, email, password, profilePicture });

  res.status(201).json({
    name: user.name,
    email: user.email,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
    token: generateAccessToken(user._id),
  });
});

const generateAccessToken = (userId) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const accessExpiry = process.env.JWT_ACCESS_EXPIRY;
  return jwt.sign({ userId }, accessSecret, { expiresIn: accessExpiry });
};

module.exports = {
  registerUser,
  loginUser,
};
