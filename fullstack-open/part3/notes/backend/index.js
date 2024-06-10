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

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note){
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch ( error => next(error))
  }
)

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  // // id has a curly brace at the end for some reason
  // const id = request.params.id.slice(0,-1);

  Note.findByIdAndUpdate(
    request.params.id, 
    {content, important},
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
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
  
  note.save()
  .then(savedNote => {
    response.json(savedNote);
  })
  .catch(error => next(error));

})
  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name  === 'ValidationError'){
    return response.status(400).send({error: error.message})
  }
  next(error);
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);