const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'MartinFowler',
    'author': 'Martin Fowler',
    'url': 'https://martinfowler.com/',
    'likes': 0,
    'id': '60a10e0433c40b3e53509710'
  },
  {
    'title': 'DexterLakin',
    'author': 'Dexter Lakin',
    'url': 'https://dexterlakin.com/',
    'likes': 0,
    'id': '60a113b782ac284a69b6b42a'
  }
]

const nonExistingId = async () => {
  const blog = new Blog(  {
    'title': 'DexterLakin',
    'author': 'Dexter Lakin',
    'url': 'https://dexterlakin.com/',
    'likes': 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
