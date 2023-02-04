const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userAgentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    numOfActiveTrips: {
        type: Number,
    },
    address: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        
    }
}, {
    timestamps: true
});

const User_Agent = mongoose.model("User_Agent", userAgentSchema);

module.exports = User_Agent;
