import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({author: '', title: '', url: ''})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
  }

  const logoutButton = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({title: '', author: '', url: ''})
        setNotificationMessage(`A new blog "${blogObject.title}" by ${blogObject.author} was added.`)
      })
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

  const newBlogForm = () => (
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

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in.</p>
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    let className='notification'
    if (message.includes('Wrong credentials') || message.includes('validation failed')) {
      className='error'
    }
    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ?
        loginForm() :
        blogList()
      }
      {logoutButton()}
    </div>
  )
}

export default App

