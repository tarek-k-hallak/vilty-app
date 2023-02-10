const mongoose = require('mongoose')
const joi = require('joi')

const User = mongoose.model("User", new mongoose.Schema({
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
})
)

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