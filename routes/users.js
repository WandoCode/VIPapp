var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { vip_application } = require("../middlewares/validUsers");
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

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
