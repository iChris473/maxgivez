
const Billing = require("../models/Billing");

// Create Billing
exports.createBilling = async (req, res) => {
    try {

        const thisBilling = await Billing.find({userId: req.body.userId})
        
        if(thisBilling.length > 0) return res.status(401).json("Billing address already exists")

        const address = new Billing(req.body)
        await address.save()
        return res.status(201).json(address)
    } catch (error) {
        res.status(400).status(error)
    }

}

// Update Billing
exports.updateBilling = async (req, res) => {
    try {
        const address = await Billing.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
                $set: req.body
            },{new: true}
        );
        res.status(200).json(address) 
    } catch (error) {
        res.status(404).json(error)  
    }
}

// get a users Billing
exports.getUsersBilling = async (req, res) => {
    
    try {
        const address = await Billing.find({
            userId: req.params.id
        })
        res.status(200).json(address) 
    } catch (error) {
        res.status(404).json(error)  
    }
}
// get all users Billing
exports.getAllBilling = async (req, res) => {
    try {
        const adress = await Billing.find({})
         res.status(200).json(adress) 
    } catch (error) {
        res.status(404).json(error)  
    }
}
// delete Billing
exports.deleteBilling = async (req, res) => {
    try {
        const address = await Billing.findOneAndDelete({productId: req.query.id})
        res.status(200).json(address) 
    } catch (error) {
        res.status(404).json(error)  
    }
}

