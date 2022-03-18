const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const MessageSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 50 },
    message: { type: String, required: true, minlength: 50, maxlength: 5000 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // USe .createdAt to get creation timestamp, and .updatedAt to get the last update timestamp
);

MessageSchema.virtual("url").get(function () {
  return `message/${this._id}`;
});

MessageSchema.virtual("createdAtFormatted").get(function () {
  let moment_date = moment(new Date(this.createdAt));

  return moment_date.format("DD/MM/YYYY");
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
