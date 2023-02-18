const express = require('express')
const router = express.Router()
const _ = require("lodash")
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const { User, Validate } = require('../module/user')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    }
    catch (err) {
        console.error(err.message)
    }
})

router.post('/', async (req, res) => {
    const { error } = Validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("Email Already in use.")

    user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    try {
        await user.save();
        res.send(_.pick(user, ['_id', 'name', 'email']));
    }
    catch (err) {
        res.send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id })
        if (result.deletedCount == 0) return res.status(404).send("The user with the given Id was not found!")
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
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!user) return res.status(404).send("The Course with the given Id was not found!")
        res.send(user)
    }
    catch (err) {
        res.send(err.message);
    }
})

module.exports = router