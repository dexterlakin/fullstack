const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(50000)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const author = response.body.map(r => r.author)

    expect(author).toContain(
      'Martin Fowler'
    )
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog =   {
      'title': 'TroyHunt',
      'author': 'Troy Hunt',
      'url': 'https://troyhunt.com/',
      'likes': 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const author = blogsAtEnd.map(n => n.author)
    expect(author).toContain(newBlog.author)
  })

  test('likes property will default to 0 if missing', async () => {
    const newBlog =   {
      'title': 'TroyHunt',
      'author': 'Troy Hunt',
      'url': 'https://troyhunt.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    const savedBlog = blogsAtEnd.find(b => b.author === newBlog.author)

    expect(savedBlog.likes).toBe(0)
  })

  test('title and url properties are required', async () => {
    const newBlog =   {
      'author': 'Troy Hunt'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
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
    const blogsAtStart = await helper.blogsInDb()
    const expectedLikes = blogsAtStart[0].likes + 1
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
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

afterAll(async () => {
  mongoose.disconnect()
  // avoid jest open handle error
  await new Promise(resolve => setTimeout(() => resolve(), 500))
})
