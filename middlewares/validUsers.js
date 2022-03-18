/* Validation for form in users route */

const { body } = require("express-validator");

module.exports = {
  vip_application: body("vip_password")
    .trim()
    .equals(process.env.VIP_PASSWORD)
    .isLength({ max: 50 }),
  become_admin: body("admin_password")
    .trim()
    .equals(process.env.ADMIN_PASSWORD)
    .isLength({ max: 50 }),
};
