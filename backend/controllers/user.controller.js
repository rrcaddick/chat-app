const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const getUsers = asyncHandler(async (req, res, next) => {
  const {
    user,
    query: { search },
  } = req;

  const searchParams = search
    ? {
        $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
        _id: { $ne: user._id },
      }
    : {};

  const users = await User.find(searchParams).select("-password -createdAt -updatedAt");

  res.status(200).json({
    users,
  });
});

module.exports = {
  getUsers,
};
