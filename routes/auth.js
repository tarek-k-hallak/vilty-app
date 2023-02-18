const express = require('express')
const router = express.Router()
const joi = require('joi')
const bcrypt = require('bcrypt')

const { User } = require('../module/user')

function validate(req) {
    const schema = {
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(8).max(255).required(),
    }
    return joi.validate(req, schema)
}

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Email is not correct")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("password is not correct.")

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(user)
})

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    }
    catch (err) {
        console.error(err.message)
    }
})

module.exports = router