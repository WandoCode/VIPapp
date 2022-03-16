var express = require("express");
var router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const validIndex = require("../middlewares/validIndex");
const indexControllers = require("../controllers/indexControllers");

/* GET home page. */
router.get("/", indexControllers.index);

/* GET sign up page. */
router.get("/signup", indexControllers.signup_get);

/* POST request for sign up. */
router.post("/signup", validIndex.signUp, indexControllers.signup_post);

/* GET sign in page. */
router.get("/signin", indexControllers.signin_get);

/* POST request for sign in. */
router.post("/signin", validIndex.signIn, indexControllers.signin_post);

/* GET log out. */
router.get("/logout", isAuthenticated, indexControllers.logout_get);

/* GET unauthorized path page. */
router.get("/error", indexControllers.error);

module.exports = router;
