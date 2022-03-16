var express = require("express");
var router = express.Router();

const indexControllers = require("../controllers/indexControllers");

/* GET home page. */
router.get("/", indexControllers.index);

/* GET sign up page. */
router.get("/signup", indexControllers.signup_get);

/* POST request for sign up. */
router.post("/signup", indexControllers.signup_post);

/* GET sign in page. */
router.get("/signin", indexControllers.signin_get);

/* POST request for sign in. */
router.post("/signin", indexControllers.signin_post);

/* GET log out. */
router.get("/logout", indexControllers.logout_get);

module.exports = router;
