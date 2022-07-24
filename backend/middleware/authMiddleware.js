const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
  const token =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Not authorized, invalid user");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
});

module.exports = protect;
