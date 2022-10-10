
const Cart = require("../models/Cart");

// Create cart
exports.createCart = async (req, res) => {
    try {

        const thisCart = await Cart.find({productId: req.body.productId, userId: req.body.userId})
    
        if(thisCart.length != 0) return res.status(401).json("product already in cart")

        const newCart = new Cart(req.body)
        await newCart.save()
        res.status(201).json(newCart)
        
    } catch (error) {
        res.status(400).status(error)
    }

}

// Update Cart
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.query.id, {
                $set: req.body
            },{new: true}
        );
        res.status(200).json(cart) 
    } catch (error) {
        res.status(404).json(error)  
    }
}

// get a users cart
exports.getUsersCart = async (req, res) => {
    const {userid} = req.query
    try {
        const cart = await Cart.find({
            userId: userid
        })
        res.status(200).json(cart) 
    } catch (error) {
        res.status(404).json(error)  
    }
}
// get all users cart
exports.getAllCart = async (req, res) => {
    try {
        const cart = await Cart.find({})
        res.status(200).json(cart) 
    } catch (error) {
        res.status(404).json(error)  
    }
}
// delete cart
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({productId: req.query.id})
        res.status(200).json(cart) 
    } catch (error) {
        res.status(404).json(error)  
    }
}

