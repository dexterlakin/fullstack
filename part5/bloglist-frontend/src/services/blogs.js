import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (token) => {
  console.log("APPLE")
  console.log(token)
  if (token == null)
  {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  } else {
    console.log("BANANA")
    const config = { headers: { Authorization: "bearer " + token }}
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
  }
}

export default { getAll }
