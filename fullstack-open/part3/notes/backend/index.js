// A function that is used to create an Express application stored in the app variable
require('dotenv').config(); // Need to go before import the notes module
const Note = require('./models/notes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('dist'));

// To access the data easily, we need the help of the Express json-parser
app.use(express.json());

// Define two routes to the application
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note);
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter ( note => note.id !== id);
  response.status(204).end();
})

function generateId() {
  const maxId = notes.length > 0 
  ? Math.max (...notes.map(n => n.id)) 
  : 0;

  return maxId + 1;
}
app.post('/api/notes', (request, response) => {

  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  
  note.save().then(savedNote => {
    response.json(savedNote);
  })

})
  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// Simple Web Server

//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
//   })
  
//   const PORT = 3001
//   app.listen(PORT)
//   console.log(`Server running on port ${PORT}`)