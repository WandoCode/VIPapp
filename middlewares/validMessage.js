/* Validation for form in message route */

const { body } = require("express-validator");

module.exports = {
  new_message: [
    body("title").trim().isLength({ min: 5, max: 50 }),
    body("message").trim().isLength({ min: 50, max: 5000 }),
  ],
};
