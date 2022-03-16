var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const messageController = require("../controllers/messageControllers");

/* GET create a new message */
router.get("/new-post", isAuthenticated, messageController.new_message_get);

/* POST create a new message */
router.get("/new-post", isAuthenticated, messageController.new_message_post);

module.exports = router;
