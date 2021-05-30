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
    expect(author).toContain(newBlog['author'])
  })

  // test('fails with status code 400 if data invaild', async () => {
  //   const newBlog = {
  //     foo: 'bar'
  //   }

  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(400)

  //   const blogsAtEnd = await helper.blogsInDb()

  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  // })
})

afterAll(async () => {
  mongoose.disconnect()
  // avoid jest open handle error
  await new Promise(resolve => setTimeout(() => resolve(), 500))
})
