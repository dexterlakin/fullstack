import { useState, React } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const [newAnecdote, setNewAnecdote] = useState('')

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you created '${content}'`, 5)
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
            name="anecdote"
            value={newAnecdote}
            onChange={handleNewAnecdoteChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
