
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createUser = async (req, res) => {
    const newUser = new User(req.body)
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(404).json("An account has been registered with this email")
    }
}

// Login User
exports.loginUser = async  (req, res) => {
    try {
        // finds user by email
        const user = await User.findOne({ email: req.body.email })
        
        if(!user){
            return res.status(401).json("An account is not registered with this email")
            // res.status(401).json("enter correct credentials")
        }

        // compares password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(404).json("Incorrect password")
        //  res.status(401).json("enter correct credentials")

        // sends JSON_WEB_TOKEN
        const token = user.getSignedToken()
        
        // res.status(200).json({success:true, token})
        // // hides password 
        const {_id, email, ...others} = user._doc

        return res.status(200).json({
            id: _id,
            email,
            token
        })
        // return res.status(200).json(user)

    } catch (err) {
        return res.status(400).json(err)
    }
}

exports.updateUser = async(req, res) => {
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
        }
        const user = await User.findOneAndUpdate(
            {
                _id: req.user.id
            }, {
                $set: req.body
            },{new: true}
        );
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.user.id})
        res.status(200).json("User Account deleted")
    } catch (error) {
        res.status(400).json(error)
    }
}

// get a user
exports.getOneUser = async (req, res) => {
    try {
       const user = await User.findById(req.query.id)
       const {password, isAdmin, createdAt, updatedAt, ...others} = user._doc
        res.status(200).json(others)
    } catch (err) {
       res.status(404).json(err) 
    }
}

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
       const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
       res.status(404).json(err) 
    }
}