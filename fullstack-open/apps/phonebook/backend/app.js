const express = require('express')
const app = express()
require('dotenv').config()

const config = require('./utils/config')
const mongoose = require('mongoose')
const phonebookRouter = require('./controllers/phonebook')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')

logger.info('Connecting to MongoDB...')

mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB!')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/phonebook/', phonebookRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app