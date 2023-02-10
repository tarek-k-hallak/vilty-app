const express = require('express')
const router = express.Router()

const { Validate, Genre } = require('../module/genre')

router.post('/', async (req, res) => {
    const genre = new Genre({
        name: req.body.name,
    })

    const { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const result = await genre.save();
        res.send(result);
    }
    catch (err) {
        res.send(err.message);
    }
})

router.get('/', async (req, res) => {
    try {
        const genre = await Genre.find()
        res.send(genre)
    }
    catch (err) {
        console.error(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Genre.deleteOne({ _id: req.params.id })
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
        const genre = await Genre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!genre) return res.status(404).send("The Course with the given Id was not found!")
        res.send(genre)
    }
    catch (err) {
        res.send(err.message);
    }
})

module.exports = router