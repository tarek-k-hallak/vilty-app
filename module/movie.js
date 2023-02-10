const mongoose = require('mongoose')
const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)
const { genreSchema } = require('./genre')

const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    nubmerInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}))

function validateMovie(movie) {
    const schema = {
        title: joi.string().min(3).max(50).required(),
        genreId: joi.objectId().required(),
        nubmerInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required(),
    }
    return joi.validate(movie, schema)
}

exports.Movie = Movie
exports.Validate = validateMovie