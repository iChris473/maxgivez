
const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})

module.exports = mongoose.model("Orders", OrderSchema)
