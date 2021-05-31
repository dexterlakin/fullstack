const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  console.log(blogToDelete.user.toString())

  if ( blogToDelete.user.toString() === decodedToken.id.toString() )
  {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'a blog can be deleted only by the user who added the blog' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = {}
  blog.likes = request.body.likes

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).end()
})

module.exports = blogRouter
