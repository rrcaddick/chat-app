const router = require("express").Router();

router.route("/").get().post();
router.route("/:id").put().delete();

module.exports = router;
