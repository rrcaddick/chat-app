const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { getUsers } = require("../controllers/user.controller");

router.get("/", getUsers);

module.exports = router;
