const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripEventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    eventType: {    //registered, created, deleted, updated, cancelled, unregister
      type: String,
      required: true,
    }
  }, {
      timestamps : true
  });
  
  const TripEvent = mongoose.model("TripEvent", tripEventSchema);
  
  module.exports = TripEvent;