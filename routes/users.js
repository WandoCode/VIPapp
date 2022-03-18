var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { vip_application, become_admin } = require("../middlewares/validUsers");
const userController = require("../controllers/userControllers");

/* GET VIP application page */
router.get("/VIP-application", isAuthenticated, userController.becomeVIP_get);

/* POST VIP application page */
router.post(
  "/VIP-application",
  isAuthenticated,
  vip_application,
  userController.becomeVIP_post
);

/* GET is_admin page */
router.get(
  "/admin-application",
  isAuthenticated,
  userController.become_admin_get
);

/* POST is_admin page page */
router.post(
  "/admin-application",
  isAuthenticated,
  become_admin,
  userController.become_admin_post
);

module.exports = router;
