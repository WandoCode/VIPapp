const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MassageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MassageSchema.virtual("url").get(function () {
  return `message/${this._id}`;
});

const MessageModel = mongoose.model("Message", MassageSchema);

module.exports = MessageModel;
