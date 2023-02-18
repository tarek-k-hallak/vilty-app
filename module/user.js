const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require("jsonwebtoken")
// const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateAuthToken = function (bayload) {
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))
    const token = jwt.sign({ _id: this._id, name: this.name, isAdmin: this.isAdmin }, 'jwtPrivateKey')
    return token
}

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = {
        name: joi.string().min(3).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(8).max(255).required(),
    }
    return joi.validate(user, schema)
}

exports.User = User
exports.Validate = validateUser