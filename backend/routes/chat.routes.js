const router = require("express").Router();
const { getChats, addEditChat, updateChat, deleteChat } = require("../controllers/chat.controller");
const protect = require("../middleware/authMiddleware");

router.route("/").get(getChats).post(addEditChat);
router.route("/:id").put(updateChat).delete(deleteChat);

module.exports = router;
