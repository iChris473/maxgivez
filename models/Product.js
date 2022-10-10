
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
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
    },
    platform:{
        type: String,
        default: "all"
    }
}, {timestamps: true})

module.exports = mongoose.model("Products", ProductSchema)