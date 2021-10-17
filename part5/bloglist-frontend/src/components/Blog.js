import { useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { incrementLikes, deleteFromState } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisibility] = useState(false)

  const label = visible ?
    'hide' : 'view'

  const handleClick = () => {
    visible ?
      setVisibility(false) :
      setVisibility(true)
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(incrementLikes(blog))
    dispatch(setNotification(`you liked '${blog.title}'`, 5))
  }

  const preView = (
    <div>
      <p>{blog.title} {blog.author}</p>
    </div>
  )

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteFromState(blog.id))
      dispatch(setNotification(`you deleted '${blog.title}'`, 5))
    }
  }

  const deleteButton = () => (
    <form onSubmit={handleDelete}>
      <button type="submit">remove</button>
    </form>
  )

  const detailedView = (
    <div>
      <p>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <div>
        <form onSubmit={handleLike}>
          <p>{blog.likes} likes</p>
          <button type="submit">like</button>
        </form>
        { (user.id === blog.user || user.id === blog.user.id) && deleteButton() }
      </div>
    </div>
  )

  return (
    <div style={blogStyle}>
      <li className='blog'>
        { visible ? detailedView : preView }
        <button onClick={handleClick}>{label}</button>
      </li>
    </div>
  )
}

export default Blog
