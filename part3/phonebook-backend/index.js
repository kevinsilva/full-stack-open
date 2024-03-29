const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post-data', function (request) {
  if (request.method === 'POST') return JSON.stringify(request.body)
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (_, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((foundPerson) => {
      if (foundPerson) response.json(foundPerson)
      else response.status(404).end()
    })
    .catch((error) => next(error))
})

app.get('/info', (_, response) => {
  Person.countDocuments({}).then((count) => {
    const info = `Phonebook has info for ${count} people`
    const date = new Date()

    const infoHtml = `
          <div>
              <p>${info}</p>
              <p>${date}</p>
          </div>
      `

    response.send(infoHtml)
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number)
    return response.status(404).json({ error: 'name or number is missing' })

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson)
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:_id', (request, response, next) => {
  Person.findByIdAndRemove(request.params._id)
    .then((result) => {
      console.log(result)
      response.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
