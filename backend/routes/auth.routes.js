const router = require("express").Router();
const { registerUser, loginUser, refreshToken, logoutUser } = require("../controllers/auth.controller");
const validateInputs = require("../middleware/validatorMiddleware");
const { validateRegistation, validateLogin } = require("../validators/authValidators");
const upload = require("../middleware/uploadMiddleware");

// Heroku free version does not allow file upload, therefore default profile picture will be used
const canUpload = process.env.DEPLOY_ENV !== "heroku";

router.post(
  "/register",
  canUpload ? upload.single("profilePicture") : (_, __, next) => next(),
  validateInputs(validateRegistation),
  registerUser
);

router.post("/login", validateInputs(validateLogin), loginUser);

router.get("/refreshToken", refreshToken);

router.get("/logout", logoutUser);

module.exports = router;
