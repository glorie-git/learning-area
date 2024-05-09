const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(phonebook);
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

  if (!body.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const person = {
    id: generateID(),
    name: body.name,
    number: body.number,
  }
  console.log(person);
  phonebook = phonebook.concat(person);
  response.json(person);
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