const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  // Both username and password must be given
  if ( !('password' in body) || body.password === null) {
    return response.status(400).send({ error: 'Both username and password must be given' })
  }

  // Both username and password must be at least 3 characters long
  if (body.password.length <= 3) {
    return response.status(400).send({ error: '`password` to be longer than 3 characters' })
  } else if (body.username.length <= 3) {
    return response.status(400).send({ error: '`username` to be longer than 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

module.exports = usersRouter
