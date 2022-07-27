const router = require("express").Router();
const { getChats, addEditChat, deleteLeaveChat } = require("../controllers/chat.controller");
const protect = require("../middleware/authMiddleware");

router.route("/").get(getChats).post(addEditChat);
router.route("/:chatId").post(deleteLeaveChat);

module.exports = router;
