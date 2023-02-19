const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userEventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    },
    eventType: {    //register,login, deleted, updated, 
      type: String,
      required: true,
    }
  }, {
      timestamps : true
  });
  
  const UserEvent = mongoose.model("UserEvent", userEventSchema);
  
  module.exports = UserEvent;