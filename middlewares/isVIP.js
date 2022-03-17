module.exports = {
  isVIP: (req, res, next) => {
    if (req.user.isVIP) return next();
    else res.redirect("/not_vip");
  },
};
