const { validationResult } = require("express-validator");
const User = require("../models/user");

/* GET VIP application page */
exports.becomeVIP_get = (req, res, next) => {
  res.render("VIP_application");
};

/* POST VIP application page */
exports.becomeVIP_post = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    // Error found during validation
    if (!errors.isEmpty()) {
      res.render("VIP_application", { wrongPassword: true });
    }
    // No error found
    else {
      // Update User to VIP
      await User.findByIdAndUpdate(req.user.id, { isVIP: true });

      // Make the update for the current session
      req.user.isVIP = true;

      res.render("VIP_application");
    }
  } catch (err) {
    return next(err);
  }
};
