const passport = require("passport");
const bcrypt = require("bcryptjs");
const { validationResult, body } = require("express-validator");

const User = require("../models/user");
const Message = require("../models/message");

/* GET home page. */
exports.index = async function (req, res, next) {
  try {
    // Get the 10 lasts messages from the DB
    const messages = await Message.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(10);

    // Render them
    res.render("index", { messages: messages, page: "index" });
  } catch (err) {
    return next(err);
  }
};

/* GET sign up page. */
exports.signup_get = (req, res, next) => {
  res.render("signup", { page: "signup" });
};

/* POST request for sign up. */
exports.signup_post =
  // Form validation is made in router/index.js
  (req, res, next) => {
    // Collect errors if they exists
    const errors = validationResult(req);

    // check if username is already in DB
    User.findOne({ username: req.body.username }).exec((err, user_found) => {
      if (err) return next(err);
      // Username already used
      if (user_found) {
        errors.errors.push({ msg: "Username already used" });
      }
      // Username free to use

      // Check if errors have been found
      if (!errors.isEmpty()) {
        res.render("signup", {
          datas: {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
          errors: errors.errors,
          page: "signup",
        });
      }
      // No errors in form
      else {
        // Hash password
        bcrypt.hash(req.body.password, 10, (err, h_pass) => {
          if (err) return next(err);

          new User({
            username: req.body.username,
            password: h_pass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          })
            // Save new user to DB
            .save((err) => {
              if (err) return next(err);

              // Open the session for the user
              passport.authenticate("local", {
                successRedirect: "/",
                failureRedirect: "/error",
              })(req, res, next);
            });
        });
      }
    });
  };

/* GET sign in page. */
exports.signin_get = (req, res, next) => {
  res.render("signin", { page: "signin" });
};

/* POST request for sign in. */
exports.signin_post = async (req, res, next) => {
  // Form validation is made in router/index.js

  // Collect errors if they exists
  const errors = validationResult(req);

  // Errors have been found: render form again
  if (!errors.isEmpty()) {
    res.render("signin", { errors: errors.errors, page: "signin" });
  }
  // No errors in form
  else {
    // Authenticate with passport
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/error",
    })(req, res, next);
  }
};

/* GET log out. */
exports.logout_get = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

/* GET unauthorized path page. */
exports.error = (req, res, next) => {
  res.render("not_auth");
};
