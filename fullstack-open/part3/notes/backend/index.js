// A function that is used to create an Express application stored in the app variable
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static('dist'));

// To access the data easily, we need the help of the Express json-parser
app.use(express.json());

// MongoDB
const mongoose = require('mongoose');

const password = process.env.PASSWORD;

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  `mongodb+srv://dev:${password}@cluster0.6hdkwli.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     }
// ]

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
  const id = Number(request.params.id);
  // console.log(id);
  const note = notes.find (note => {
    return note.id === id
  });

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
 
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

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }
  
  notes = notes.concat(note)

  response.json(note);
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