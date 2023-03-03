const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userEventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventType: {    //check enums.txt file for codes
      type: Number,
      required: true,
    },
    additionalInfo: {   //In the case of update tells what new attributes are in place now
        type: Schema.Types.Mixed,
    }
  }, {
      timestamps : true
  });
  
  const UserEvent = mongoose.model("User_Event", userEventSchema);
  
  module.exports = UserEvent;