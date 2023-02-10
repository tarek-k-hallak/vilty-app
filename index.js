const express = require('express')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());

const customer = require('./routes/customers')
const genre = require('./routes/genres')
const movie = require('./routes/movies')
const rental = require('./routes/rentals')

app.use('/api/customer', customer)
app.use('/api/genre', genre)
app.use('/api/movie', movie)
app.use('/api/rental', rental)

function ConnectToMongoDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/Vitly')
        .then(() => console.log('Connected to MongoDB!'))
        .catch(() => console.log('Could not connect to MongoDB'))
}
ConnectToMongoDB();


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})