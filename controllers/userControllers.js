const { validationResult } = require("express-validator");
const User = require("../models/user");

/* GET VIP application page */
exports.becomeVIP_get = (req, res, next) => {
  res.render("VIP_application", { page: "VIP_application" });
};

/* POST VIP application page */
exports.becomeVIP_post = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // Error found during validation
    if (!errors.isEmpty()) {
      res.render("VIP_application", {
        wrongPassword: true,
        page: "VIP_application",
      });
    }
    // No error found
    else {
      // Update User to VIP
      await User.findByIdAndUpdate(req.user.id, { isVIP: true });

      // Make the update for the current session
      req.user.isVIP = true;

      res.render("VIP_application", { page: "VIP_application" });
    }
  } catch (err) {
    return next(err);
  }
};

/* GET is_admin page */
exports.become_admin_get = async (req, res, next) => {
  res.render("become_admin");
};

/* POST is_admin page page */
exports.become_admin_post = async (req, res, next) => {
  // Validation is made in router, with middlware.
  try {
    const errors = validationResult(req);

    // Error found during validation
    if (!errors.isEmpty()) {
      res.render("admin_application", { wrongPassword: true });
    }
    // No error found
    else {
      // Update DB
      await User.findByIdAndUpdate(req.user.id, { isAdmin: true, isVIP: true });

      // Update current session
      req.user.isAdmin = true;
      req.user.isVIP = true;

      res.render;
    }
  } catch (err) {
    return next(err);
  }
};
