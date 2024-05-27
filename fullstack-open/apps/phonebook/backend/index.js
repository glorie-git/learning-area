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

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
      response.json(people);
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find (person => Number(person.id) === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

function generateID () {
  const randomId = Math.floor(Math.random() * 10000000);
  return randomId;
}

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

  const person = Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson);
  })

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    phonebook = phonebook.filter (person => Number(person.id) !== id);
    response.status(204).end();
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

app.use(unknownEndpoint)