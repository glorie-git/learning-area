require('dotenv').config()

const config = require('./utils/config')
const mongoose = require('mongoose')
const phonebookRouter = require('./controllers/phonebook')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

logger.info('Connecting to MongoDB...')

mongoose.set('strictQuery',false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB!')
  })
  .catch(error => {
    logger.error('Error connecting to MongoDB:', error.message)
  }
  )

app.use(middleware.requestLogger)

app.use('/api/phonebook/', phonebookRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}.`)
})

app.use(middleware.unknownEndpoint)
// This has to be the last loaded middleware, also all the routes should be registered before this!
app.use(middleware.errorHandler)