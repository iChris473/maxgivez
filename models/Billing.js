
const mongoose = require("mongoose")

const Billingchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    street: {
        type: Object,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    state: {
        type: String,
        require: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Billing", Billingchema)
