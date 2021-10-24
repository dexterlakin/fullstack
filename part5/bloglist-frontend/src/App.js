import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import ConnectedNotification from './components/Notification'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const reduxUser = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()


  useEffect(() => {
    if (Object.keys(reduxUser).length !== 0) {
      blogService.getAll()
        .then(blogs => {
          dispatch(initializeBlogs(blogs))
        })
    }
  }, [reduxUser])

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUserToken')
    dispatch(logout)
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
      blogService.setToken(user.token)
      dispatch(login(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${user.username} logged in.`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
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

      {Object.keys(reduxUser).length === 0 ?
        loginForm() :
        <div>
          <p>{reduxUser.name} logged in</p>
          {logoutButton()}
          {blogForm()}
        </div>
      }

      <div>
        <BlogList user={reduxUser} />
      </div>
    </div>
  )
}

export default App

