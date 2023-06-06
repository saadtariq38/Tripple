const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expiry: {
    type: Number,
    required: true,
  }
}, {
    timestamps : true
});

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;