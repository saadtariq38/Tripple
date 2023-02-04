const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    min: 0,
    max: 2
  }
}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;