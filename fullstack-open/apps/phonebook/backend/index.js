require('dotenv').config();
const Person = require('./models/phonebook');

const express = require('express');
const app = express();

app.use(express.json());
var morgan = require('morgan');
app.use(express.static('dist'));

morgan.token('new', function (req, res) { 
  if (req.method === 'POST'){
    return JSON.stringify(req.body);
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :new'));

// middleware to catch any un configured endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response, next) => {
    Person.find({})
    .then(people => {
      if (people) {
        response.json(people);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch ( error => next(error))  
  }
)

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  }

  // id has a curly brace at the end for some reason
  const id = request.params.id;

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  // Error handling for creating new entries
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  // Is this an existing user?
  // console.log(Person.findOneAndUpdate({ name: body.name }, { number: body.number }));

  const person = Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson);
  })

})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end();
  })
  .catch(error => next(error));
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

app.get('/info', (request, response) => {
    const numInfo = phonebook.length;
    const d = new Date(Date.now());
    const content = `<p>Phonebook has info for ${numInfo} people</p><p>${d}</p>`;
    response.send(content);
})

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error);
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);