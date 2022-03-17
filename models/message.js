const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MassageSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 50 },
    message: { type: String, required: true, minlength: 50, maxlength: 5000 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // USe .createdAt to get creation timestamp, and .updatedAt to get the last update timestamp
);

MassageSchema.virtual("url").get(function () {
  return `message/${this._id}`;
});

const MessageModel = mongoose.model("Message", MassageSchema);

module.exports = MessageModel;
