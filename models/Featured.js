
const mongoose = require("mongoose")

const FeaturedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "phone"
    },
    picture: {
        type: Array,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    desc: {
        type: String
    },
    brand: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Featureds", FeaturedSchema)