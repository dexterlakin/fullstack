const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user._id
  })
  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)

  console.log(blogToDelete.user.toString())

  if ( blogToDelete.user.toString() === request.user.toString() )
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
