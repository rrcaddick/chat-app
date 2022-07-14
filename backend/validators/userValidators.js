const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const User = require("../models/user");

const validateRegistation = [
  body("name", "Name should not contain numbers or special characters. (Sorry Elon)")
    .isAlpha("en-ZA", { ignore: " " })
    .notEmpty()
    .trim(),
  body("email", "Please enter a valid email")
    .isEmail()
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("User already exists");
      return true;
    })
    .normalizeEmail()
    .trim(),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password should be min 8 chatacter, and contain at least 1 lowercase, uppercase, number and special character"
    )
    .trim(),
  body("confirmPassword").custom((confirmPassword, { req }) => {
    if (confirmPassword !== req?.body?.password) throw new Error("Passwords do not match");
    return true;
  }),
];

const validateLogin = [
  body().custom(async (body, { req }) => {
    if (!body?.email || !body?.password) throw new Error("Email and password is required");
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email");

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) throw new Error("Invalid password");

    req.user = user;
    return true;
  }),
];

module.exports = {
  validateRegistation,
  validateLogin,
};
