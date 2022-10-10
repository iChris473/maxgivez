
const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carts", CartSchema)