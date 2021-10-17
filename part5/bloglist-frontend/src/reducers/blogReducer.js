import blogService from '../services/blogs'

const incrementLikes = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.like(blog)

    dispatch({
      type: 'BLOG/LIKED',
      data: {
        id: blog.id,
        updatedBlog: updatedBlog
      }
    })
  }
}

const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'BLOG/CREATED',
      data: newBlog,
    })
  }
}

const deleteFromState = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'BLOG/DELETED',
      id: id,
    })
  }
}

const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOGS/INIT',
      data: blogs,
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'BLOG/LIKED': {
    return state.map(blog =>
      blog.id === action.data.id ? action.data.updatedBlog : blog
    )
  }
  case 'BLOG/CREATED': {
    return [...state, action.data]
  }
  case 'BLOG/DELETED': {
    return state.filter(blog => blog.id !== action.id)
  }
  case 'BLOGS/INIT': {
    return action.data
  }
  default: {
    return state
  }
  }
}

export {
  blogReducer,
  incrementLikes,
  createBlog,
  deleteFromState,
  initializeBlogs
}
