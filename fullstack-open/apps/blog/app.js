const config = require('./utils/config')
const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const cors = require('cors')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Connected to MongoDB.")
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message)
    })

app.use(express.json())
app.use(cors())

app.use('/api/blogs', blogsRouter)

module.exports = app