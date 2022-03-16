const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.index = function (req, res, next) {
  res.render("index", { user: req.user });
};

exports.signup_get = (req, res, next) => {
  res.render("signup");
};

exports.signup_post = [
  // Set up form validation and form sanitation
  body("username", "Wrong email")
    .trim()
    .isEmail()
    .isLength({ min: 2, max: 50 })
    .normalizeEmail(),
  body("password").trim().isLength({ min: 6, max: 50 }),
  body("password2")
    .trim()
    .isLength({ min: 6, max: 50 })
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Password confirmation incorrect");
      } else {
        return true;
      }
    }),
  body("firstName").trim().isLength({ min: 2, max: 50 }),
  body("lastName").trim().isLength({ min: 2, max: 50 }),

  // Process POST request
  async (req, res, next) => {
    // Collect errors if they exists
    const errors = validationResult(req);

    // Errors have been found
    if (!errors.isEmpty()) {
      res.render("signup", {
        datas: {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
        errors: errors.errors,
      });
    }
    // No errors in form
    else {
      // HAsh password
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
            if (err) {
              return next(err);
            }
            // Open the session for the user
            passport.authenticate("local", {
              successRedirect: "/",
              failureRedirect: "/error",
            })(req, res, next);
          });
      });
    }
  },
];
