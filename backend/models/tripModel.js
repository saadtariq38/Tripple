const mongoose = require("mongoose");
const User = require("./userModel");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    agent: {
        type: Schema.Types.ObjectId,
        ref: "User_Agent",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {     //the duration is in days
        type: Number,
        required: true
    },
    registeredUsers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],

        default: []
    },
    images: {
        type: [
            {
                type: String,
            }
        ],
    },
    tripCategory: { //Educational, Recreational, Entertainment 
        type: String,
        required: true
    },
    tripType: {     //local, International
        type: String,
        required: true 
    },
    cost: {
        type: Number,
        required: true
    },
    status: {   //Available, Full, Ongoing, Completed, Cancelled
        type: String,
    },
    availableSeats: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numOfRatings: {
        type: Number,
        required: true
    },
    comments: {
        type: [
            {
                type: String,
            }
        ],
        default: []
    },
    startingLocation: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    itinerary: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;