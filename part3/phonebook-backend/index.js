require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())
const cors = require('cors')
app.use(cors())

const Person = require('./models/persons')

app.get('/info', (request, response) => {
  let date_ob = new Date();
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  response.send("<p>Phonebook has info for " +
    persons.length +
    " people</p>" +
    "<p>" +
    date_ob.toUTCString() + " (" + tz + ")" +
    "</p>"
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
