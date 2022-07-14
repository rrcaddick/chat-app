const { RouteHandler } = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    body: { name, email, password },
  } = req;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashPassword });

  res.status(200).json({
    name: user.name,
    email: user.email,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    name: user.name,
    email: user.email,
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
