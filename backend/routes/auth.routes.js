const router = require("express").Router();
const { registerUser, loginUser, refreshToken, logoutUser } = require("../controllers/auth.controller");
const validateInputs = require("../middleware/validatorMiddleware");
const { validateRegistation, validateLogin } = require("../validators/userValidators");
const upload = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("profilePicture"), validateInputs(validateRegistation), registerUser);

router.post("/login", validateInputs(validateLogin), loginUser);

router.get("/refreshToken", refreshToken);

router.get("/logout", logoutUser);

module.exports = router;
