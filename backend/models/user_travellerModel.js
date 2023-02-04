const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userTravellerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    passport_number: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User_Traveller = mongoose.model("User_Traveller", userTravellerSchema);

module.exports = User_Traveller;