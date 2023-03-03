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
      type: Number,
      required: true,
    },
    additionalInfo: {   //contain the updated data of a trip in the event of update
        type: Schema.Types.Mixed
    }
  }, {
      timestamps : true
  });
  
  const TripEvent = mongoose.model("Trip_Event", tripEventSchema);
  
  module.exports = TripEvent;