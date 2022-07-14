const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const validateInputs = (validationArray) => {
  return asyncHandler(async (req, res, next) => {
    await Promise.all(
      validationArray.map(async (validator) => {
        return await validator.run(req);
      })
    );
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const validationErrors = errors.array().reduce((errObj, err) => ({ ...errObj, [err.param]: err.msg }), {});
    const isLogin = req.url === "/login";
    const message = isLogin ? "Invalid email or password" : "Validation failed";

    if (!isLogin) res.validationErrors = validationErrors;
    res.status(isLogin ? 401 : 422);
    throw new Error(message);
  });
};

module.exports = validateInputs;
