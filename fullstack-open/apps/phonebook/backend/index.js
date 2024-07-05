require('dotenv').config()
const config = require('./utils/config')
const mongoose = require('mongoose')
// const Person = require('./models/phonebook')

const phonebookRouter = require('./controllers/phonebook')

const express = require('express')
const app = express()

app.use(express.json())
var morgan = require('morgan')
app.use(express.static('dist'))

morgan.token('new', function (request) {
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new'))

// middleware to catch any un configured endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

console.log('Connecting to MongoDB...')

mongoose.set('strictQuery',false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  }
  )

app.use('/api/phonebook/', phonebookRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}.`)
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

// This has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)