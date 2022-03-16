/* Validation for form in index route */

const User = require("../models/user");
const { body } = require("express-validator");

module.exports = {
  signIn: [
    body("username", "Wrong email")
      .trim()
      .isEmail()
      .isLength({ min: 2, max: 50 })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6, max: 50 }),
  ],
  signUp: [
    body("username")
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
  ],
};
