const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minlength: 2, maxlength: 50 },
  password: { type: String, required: true, minlength: 6, maxlength: 250 },
  firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
  isVIP: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.virtual("url").get(function () {
  return `user/${this._id}`;
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
