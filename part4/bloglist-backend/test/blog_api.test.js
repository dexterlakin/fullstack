const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

const Blog = require('../models/blog')

jest.setTimeout(50000)

const getToken = async () => {
  const res = await api
    .post('/api/login')
    .send({username: 'testuser', password: 'sekret'})
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return res.body.token
}

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', passwordHash })

  await user.save()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const token = await getToken()
    await api.get('/api/blogs')
      .auth(token, {type: 'bearer'})
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const token = await getToken()
    const response = await api
      .get('/api/blogs')
      .auth(token, {type: 'bearer'})
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const token = await getToken()
    const response = await api
      .get('/api/blogs')
      .auth(token, {type: 'bearer'})

    const author = response.body.map(r => r.author)

    expect(author).toContain(
      'Martin Fowler'
    )
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const token = await getToken()
    const response = await api
      .get('/api/blogs')
      .auth(token, {type: 'bearer'})

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const token = await getToken()
    const newBlog =   {
      'title': 'TroyHunt',
      'author': 'Troy Hunt',
      'url': 'https://troyhunt.com/',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .auth(token, {type: 'bearer'})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const author = blogsAtEnd.map(n => n.author)
    expect(author).toContain(newBlog.author)
  })

  test('fails if no token provided', async () => {
    const newBlog =   {
      'title': 'TroyHunt',
      'author': 'Troy Hunt',
      'url': 'https://troyhunt.com/',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('likes property will default to 0 if missing', async () => {
    const token = await getToken()
    const newBlog =   {
      'title': 'TroyHunt',
      'author': 'Troy Hunt',
      'url': 'https://troyhunt.com/'
    }

    await api
      .post('/api/blogs')
      .auth(token, {type: 'bearer'})
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    const savedBlog = blogsAtEnd.find(b => b.author === newBlog.author)

    expect(savedBlog.likes).toBe(0)
  })

  test('title and url properties are required', async () => {
    const token = await getToken()
    const newBlog =   {
      'author': 'Troy Hunt'
    }

    await api
      .post('/api/blogs')
      .auth(token, {type: 'bearer'})
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const token = await getToken()
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, {type: 'bearer'})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const author = blogsAtEnd.map(r => r.author)

    expect(author).not.toContain(blogToDelete.author)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const token = await getToken()
    const blogsAtStart = await helper.blogsInDb()
    const expectedLikes = blogsAtStart[0].likes + 1
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .auth(token, {type: 'bearer'})
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const updatedBlog = blogsAtEnd.find(b => b.author === blogToUpdate.author)

    expect(updatedBlog.likes).toBe(expectedLikes)
  })
})


describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const token = await getToken()
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .auth(token, {type: 'bearer'})
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api
      .get('/api/users')
      .auth(token, {type: 'bearer'})
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(usersAtEnd.body).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const token = await getToken()
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Superuser',
      password: 'sekret',
    }

    const result = await api
      .post('/api/users')
      .auth(token, {type: 'bearer'})
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const token = await getToken()
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'banana',
      name: 'SomeGuy'
    }

    const result = await api
      .post('/api/users')
      .auth(token, {type: 'bearer'})
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Both username and password must be given')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const token = await getToken()
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'banana',
      name: 'SomeGuy',
      password: 'abc',
    }

    const result = await api
      .post('/api/users')
      .auth(token, {type: 'bearer'})
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`password` to be longer than 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  mongoose.disconnect()
  // avoid jest open handle error
  await new Promise(resolve => setTimeout(() => resolve(), 500))
})
