import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

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
      setNotificationMessage(`${user.username} logged in.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessage(`A new blog "${blogObject.title}" by ${blogObject.author} was added.`)
      })
  }

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          createBlog={addBlog}
        />
      </Togglable>

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

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

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

