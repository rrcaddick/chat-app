const router = require("express").Router();
const { getChats, addChat, getChat, updateChat, deleteChat } = require("../controllers/chat.controller");

router.route("/").get(getChats).post(addChat);
router.route("/:id").get(getChat).put(updateChat).delete(deleteChat);

module.exports = router;
