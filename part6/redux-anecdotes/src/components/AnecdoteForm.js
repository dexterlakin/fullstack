import { useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const [newAnecdote, setNewAnecdote] = useState('')

  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    console.log('new anecdote', newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }

  const handleNewAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div>
          <input
            value={newAnecdote}
            onChange={handleNewAnecdoteChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
