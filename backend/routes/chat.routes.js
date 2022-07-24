const router = require("express").Router();
const { getChats, addChat, getChat, updateChat, deleteChat } = require("../controllers/chat.controller");
const protect = require("../middleware/authMiddleware");

router.route("/").get(getChats).post(addChat);
router.route("/:id").get(getChat).put(updateChat).delete(deleteChat);

module.exports = router;
