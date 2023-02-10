const express = require('express')
const router = express.Router()

const { Validate, Customer } = require('../module/customer')

router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    const { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const result = await customer.save();
        res.send(result);
    }
    catch (err) {
        res.send(err.message);
    }
})

router.get('/', async (req, res) => {
    try {
        const customer = await Customer.find()
        res.send(customer)
    }
    catch (err) {
        console.error(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customer.deleteOne({ _id: req.params.id })
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
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!customer) return res.status(404).send("The Course with the given Id was not found!")
        res.send(customer)
    }
    catch (err) {
        res.send(err.message);
    }
})

module.exports = router