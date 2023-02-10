const mongoose = require('mongoose')
const joi = require('joi')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
})

const Genre = mongoose.model("Genre", genreSchema)

function validateGenre(genre) {
    const schema = {
        name: joi.string().min(3).required(),
    }
    return joi.validate(genre, schema)
}

exports.genreSchema = genreSchema
exports.Genre = Genre
exports.Validate = validateGenre