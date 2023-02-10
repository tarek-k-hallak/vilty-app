const express = require('express')
// var Fawn = require("fawn");
// Fawn.init("mongodb://127.0.0.1:27017/Vitly", "rentals");

const { Validate, Rental } = require('../module/rental')
const { Customer } = require('../module/customer')
const { Movie } = require('../module/movie')
const { default: mongoose } = require('mongoose')

const router = express.Router()
router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send("Invalid Customer")

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send("Invalid Movie")

    if (movie.nubmerInStock === 0) return res.status(400).send('Movie not in stack')

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        rentalFee: 10,
    })

    try {
        rental = await rental.save();
        movie.nubmerInStock--;
        movie.save();

        // new Fawn.Task()
        //     .save('rentals', rental)
        //     .update('movies', { _id: movie._id }, { $inc: { nubmerInStock: -1 } })
        //     .run();
        res.send(rental);
    }
    catch (ex) {
        res.status(500).send(ex);
    }
})

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut')
        res.send(rentals)
    }
    catch (err) {
        console.error(err.message)
    }
})

module.exports = router