const express = require('express')
const router = express.Router()

const { Validate, Movie } = require('../module/movie')
const { Genre } = require('../module/genre')

router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send("Invalid Genre")

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        nubmerInStock: req.body.nubmerInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    })

    try {
        movie = await movie.save();
        res.send(movie);
    }
    catch (err) {
        res.send(err.message);
    }
})

router.get('/', async (req, res) => {
    try {
        const movie = await Movie.find()
        res.send(movie)
    }
    catch (err) {
        console.error(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Movie.deleteOne({ _id: req.params.id })
        if (result.deletedCount == 0) return res.status(404).send("The Course with the given Id was not found!")
        res.send(result)
    }
    catch (err) {
        res.send(err.message);
    }
})

router.put('/:id', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!movie) return res.status(404).send("The Course with the given Id was not found!")
        res.send(movie)
    }
    catch (err) {
        res.send(err.message);
    }
})

module.exports = router