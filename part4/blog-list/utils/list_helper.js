const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favouriteBlog = (blogs) => blogs.reduce((a,b)=>a.likes>b.likes?a:b)

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
