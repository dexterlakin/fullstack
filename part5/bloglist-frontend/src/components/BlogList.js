import { React } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <ul>
        {[...blogs].sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          )}
      </ul>
    </div>
  )
}

export default BlogList
