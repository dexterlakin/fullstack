import {useState, React} from 'react'
const Blog = ({blog, updateBlog, deleteBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisibility] = useState(false)

  const [likes, setLikes] = useState(blog.likes)

  const label = visible ?
   'hide' : 'view'

  const handleClick = () => {
    visible ?
      setVisibility(false) :
      setVisibility(true)
  }

  const handleLike = (event) => {
    event.preventDefault()
    setLikes(likes + 1)
    updateBlog(blog.id, {
      user: blog.user,
      likes: likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const preView = (
    <div>
      <p>{blog.title} {blog.author}</p>
    </div>
  )

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
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
        {likes} likes
        <button type="submit">like</button>
      </form>
      { (user.username === blog.user || user.username === blog.user.username) && deleteButton() }
      </div>
    </div>
  )

  return (
    <div style={blogStyle}>
      <div>
        { visible ? detailedView : preView }
      </div>
      <button onClick={handleClick}>{label}</button>
  </div>
  )
}

export default Blog
