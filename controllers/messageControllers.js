/* GET create a new message */
exports.new_message_get = (req, res, next) => {
  res.render("message_add");
};

/* POST create a new message */
exports.new_message_post = (req, res, next) => {};
