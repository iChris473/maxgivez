const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, "7dd01b4b40b6b5c7f553a9dfdaf22fce54f22ea8", {expiresIn: '9999y'})
}

module.exports = mongoose.model("Users", UserSchema)