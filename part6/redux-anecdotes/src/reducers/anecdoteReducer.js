import anecdoteService from '../services/anecdotes'

const incrementVote = (id) => {
  return ({
    type: 'ANECDOTE/VOTED',
    id: id
  })
}

const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ANECDOTE/CREATED',
      data: newAnecdote,
    })
  }
}

const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'ANECDOTES/INIT',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ANECDOTE/VOTED': {
      const id = action.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    case 'ANECDOTE/CREATED': {
      return [...state, action.data]
    }
    case 'ANECDOTES/INIT': {
      return action.data
    }
    default:
      return state
  }
}

export {
  anecdoteReducer,
  incrementVote,
  createAnecdote,
  initializeAnecdotes
}
