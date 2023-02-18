const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express();
app.use(express.json());

const customers = require('./routes/customers')
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')


app.use('/api/customers', customers)
app.use('/api/genres', genres)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)


function ConnectToMongoDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/Vitly')
        .then(() => console.log('Connected to MongoDB!'))
        .catch(() => console.log('Could not connect to MongoDB'))
}
ConnectToMongoDB();

// if (!config.get('jwtPrivateKey')) {
//     console.log('FATAL ERROR: jwtP"email" is not allowedrivateKey is not defined')
//     process.exit(1)
// }

// console.log(process.env.NODE_ENV)
// console.log(app.get('env'))
// console.log("jwtPrivateKey: " + config.get('jwtPrivateKey'))


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})