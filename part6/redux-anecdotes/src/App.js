import { useState, React } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

  const [newAnecdote, setNewAnecdote] = useState('')

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'ANECDOTE/VOTED',
      data: {
        id: id
      }
    })
  }

  const createAnecdote = async (event) => {
    event.preventDefault()
    console.log('new anecdote', newAnecdote)
    dispatch({
      type: 'ANECDOTE/CREATED',
      data: newAnecdote
    })
  }

  const handleNewAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
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

export default App
