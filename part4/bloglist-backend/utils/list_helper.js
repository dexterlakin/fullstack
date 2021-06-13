const blog = require('../models/blog')
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favouriteBlog = (blogs) => blogs.reduce((a,b)=>a.likes>b.likes?a:b)

const mostBlogs = (blogs) => {
  const obj = _.countBy(blogs, 'author')
  const highestValue = Math.max.apply(null, Object.values(obj))
  const highestAuthor = Object.keys(obj).find(function(a) {
    return obj[a] === highestValue
  })
  return {'author': highestAuthor, 'blogs': highestValue}
}

const mostLikes = (blogs) => {
  const result = []
  blogs.reduce(function(acc, blog) {
    if (!acc[blog.author]) {
      acc[blog.author] = { author: blog.author, likes: 0 };
      result.push(acc[blog.author])
    }
    acc[blog.author].likes += blog.likes
    return acc
  }, {})

  return result.reduce((acc, author) => acc = acc.likes > author.likes ? acc : author, {})
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
