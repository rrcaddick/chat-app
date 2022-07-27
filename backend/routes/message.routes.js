const router = require("express").Router();
const { addMessage, getMessages } = require("../controllers/message.controller");
const upload = require("../middleware/uploadMiddleware");

router.route("/").post(addMessage);
router.route("/:chatId").get(getMessages);

module.exports = router;
