const phonebookRouter = require('express').Router()
const Phonebook = require('../models/phonebook')

phonebookRouter.get('/', (request, response, next) => {
  Phonebook.find({})
    .then(people => {
      if (people) {
        response.json(people)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

phonebookRouter.get('/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch ( error => next(error))
}
)

phonebookRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPhonebook => {
      response.json(updatedPhonebook)
    })
    .catch(error => next(error))
})

phonebookRouter.post('/', (request, response, next) => {
  const body = request.body

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

  const person = Phonebook({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPhonebook => {
      response.json(savedPhonebook)
    })
    .catch(error => next(error))
})

phonebookRouter.delete('/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

phonebookRouter.get('/info', (request, response) => {
  Phonebook.find({}).then (result => {
    console.log(result)
    if (result) {
      const numInfo = result.length
      const d = new Date(Date.now())
      const content = `<p>Phonebook has info for ${numInfo} people</p><p>${d}</p>`
      response.send(content)
    } else {
      console.log(result)
    }
  })
})

module.exports = phonebookRouter