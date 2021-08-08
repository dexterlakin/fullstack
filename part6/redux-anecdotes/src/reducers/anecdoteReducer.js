import anecdoteService from '../services/anecdotes'

const incrementVote = id => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(id)

    dispatch({
      type: 'ANECDOTE/VOTED',
      data: {
        id: id,
        updatedAnecdote: updatedAnecdote
      }
    })
  }
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
      return state.map(anecdote =>
        anecdote.id === action.data.id ? action.data.updatedAnecdote : anecdote
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
