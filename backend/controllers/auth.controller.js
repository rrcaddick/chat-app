const path = require("path");
const fs = require("fs/promises");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const refreshCookieOptions = require("../config/refreshCookieOptions");

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    body: { name, email, password },
  } = req;

  const tempImagePath = req?.file?.path;

  if (tempImagePath) {
    try {
      const targetPath = path.join(
        __dirname,
        "..",
        "assets",
        "images",
        "profile-pictures",
        `${path.basename(tempImagePath)}`
      );

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
  const {
    user,
    cookies: { refreshToken: refreshTokenCookie },
  } = req;

  try {
    const refreshToken = await generateRefreshToken(user);
    res
      .status(200)
      .clearCookie("refreshToken", refreshCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateAccessToken(user._id),
      });
  } catch (error) {
    res.status(403);
    throw new Error("Unable to generate refresh token");
  }
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const {
    cookies: { refreshToken: refreshTokenCookie },
  } = req;

  if (!refreshTokenCookie) {
    res.status(403).clearCookie("refreshToken", refreshCookieOptions);
    throw new Error("Invalid refresh token");
  }

  const user = await User.findOne({ refreshToken: refreshTokenCookie });

  try {
    const { userId } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH_SECRET);

    if (!user) {
      await User.revokeToken(userId);
      res.status(403).clearCookie("refreshToken", refreshCookieOptions);
      throw new Error("Invalid refresh token");
    }

    const refreshToken = await generateRefreshToken(user);

    res
      .status(200)
      .clearCookie("refreshToken", refreshCookieOptions)
      .cookie("refreshToken", refreshToken, refreshCookieOptions)
      .json({
        token: generateAccessToken(user._id),
      });
  } catch (error) {
    res.status(403).clearCookie("refreshToken", refreshCookieOptions);
    throw new Error("Unable to generate refresh token");
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const {
    cookies: { refreshToken: refreshTokenCookie },
  } = req;

  const user = await User.findOne({ refreshTokenCookie });

  if (user) await user.clearRefreshToken();

  res.status(200).clearCookie("refreshToken", refreshCookieOptions).json({
    message: "Logged out successfully",
  });
});

const generateAccessToken = (userId) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const accessExpiry = process.env.JWT_ACCESS_EXPIRY;
  return jwt.sign({ userId }, accessSecret, { expiresIn: accessExpiry });
};

const generateRefreshToken = async (user) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const refreshExpiry = process.env.JWT_REFRESH_EXPIRY;

  const newRefreshToken = jwt.sign({ userId: user._id }, refreshSecret, { expiresIn: refreshExpiry });
  await user.recylceRefreshToken(newRefreshToken);

  return newRefreshToken;
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};
