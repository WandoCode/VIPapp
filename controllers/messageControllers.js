const { validationResult } = require("express-validator");
const Message = require("../models/message");

/* GET create a new message */
exports.new_message_get = (req, res, next) => {
  res.render("message_add");
};

/* POST create a new message */
exports.new_message_post = (req, res, next) => {
  const errors = validationResult(req);

  // Error found during validation
  if (!errors.isEmpty()) {
    // Rerender form
    res.render("message_add", {
      datas: { title: req.body.title, message: req.body.message },
      errors: errors.errors,
    });
  }
  // No error found
  else {
    // Save a new message object in DB
    newMessage = new Message({
      title: req.body.title,
      message: req.body.message,
      author: req.user.id,
    }).save((err) => {
      if (err) return next(err);

      // Save with succes: redirect
      res.redirect("/");
    });
  }
};
