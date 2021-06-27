import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleTitleChange = (event) => {
    const blog = {
      title: event.target.value,
      author: newBlog.author,
      url: newBlog.url
    }
    setNewBlog(blog)
  }

  const handleAuthorChange = (event) => {
    const blog = {
      title: newBlog.title,
      author: event.target.value,
      url: newBlog.url
    }
    setNewBlog(blog)
  }

  const handleUrlChange = (event) => {
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: event.target.value
    }
    setNewBlog(blog)
  }

  return (
    <form className='NewBlogForm' onSubmit={addBlog}>
      <div>
        title:
        <input
          value={newBlog.title}
          onChange={handleTitleChange}
          name="title"
        />
      </div>
      <div>
        author:
        <input
          value={newBlog.author}
          onChange={handleAuthorChange}
          name="author"
        />
      </div>
      <div>
        url:
        <input
          value={newBlog.url}
          onChange={handleUrlChange}
          name="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm
