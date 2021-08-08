import { useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const [newAnecdote, setNewAnecdote] = useState('')

  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    await anecdoteService.createNew(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`you created '${newAnecdote}'`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
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
