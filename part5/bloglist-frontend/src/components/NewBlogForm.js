import React from 'react'

const NewBlogForm = ({
  addBlog=addBlog,
  handleUrlChange,
  handleAuthorChange,
  handleTitleChange,
  newBlog
}) => {
  return (
    <div>
      <form onSubmit={addBlog}>
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
    </div>
  )
}

export default NewBlogForm
