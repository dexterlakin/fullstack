import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id) => {
  let response = await axios.get(`${baseUrl}/${id}`)
  let updatedAnecdote = {
    ...response.data,
    votes: response.data.votes + 1
  }
  response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

const anecdoteService = { getAll, createNew, updateVote }


export default anecdoteService

