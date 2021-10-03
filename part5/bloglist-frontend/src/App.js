import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import ConnectedNotification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const setAllBlogs = () => {
    blogService.getAll()
      .then(blogs => {
        const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
        setBlogs(sortedBlogs)
      })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setAllBlogs()
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
  }

  const logoutButton = () => (
    <form onSubmit={handleLogout}>
      <button type="submit" id="logoutButton">logout</button>
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
      setAllBlogs()
      dispatch(setNotification(`${user.username} logged in.`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        dispatch(setNotification(`A new blog "${blogObject.title}" by ${blogObject.author} was added.`, 5))
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
    setAllBlogs()
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    setAllBlogs()
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewBlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

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
      <h1>Blogs</h1>
      <ConnectedNotification />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {logoutButton()}
          {blogForm()}
        </div>
      }

      <div>
        <ul>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App

