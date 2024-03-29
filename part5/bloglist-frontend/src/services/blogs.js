import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = token ?
    {
      headers: { Authorization: token },
    } :
    {}
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = token ?
    {
      headers: { Authorization: token },
    } :
    {}
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const like = async (blog) => {
  const config = token ?
    {
      headers: { Authorization: token },
    } :
    {}

  blog.likes += 1
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}


const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const blogService = { getAll, create, update, like, deleteBlog, setToken }


export default blogService
