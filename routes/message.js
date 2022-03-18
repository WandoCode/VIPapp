var express = require("express");
var router = express.Router();

const { isVIP } = require("../middlewares/isVIP");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuthenticated } = require("../middlewares/auth");
const { new_message } = require("../middlewares/validMessage");
const messageController = require("../controllers/messageControllers");

/* GET create a new message */
router.get(
  "/new-post",
  isAuthenticated,
  isVIP,
  messageController.new_message_get
);

/* POST create a new message */
router.post(
  "/new-post",
  isAuthenticated,
  isVIP,
  new_message,
  messageController.new_message_post
);

/* Post Delete a message */
router.post(
  "/:id/delete",
  isAuthenticated,
  isAdmin,
  messageController.delete_message_post
);

module.exports = router;
