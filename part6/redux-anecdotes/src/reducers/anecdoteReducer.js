const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const incrementVote = (id) => {
  return ({
    type: 'ANECDOTE/VOTED',
    id: id
  })
}

const createAnecdote = (newAnecdote) => {
  return (
    {
      type: 'ANECDOTE/CREATED',
      data: newAnecdote
    }
  )
}

const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'ANECDOTES/INIT',
    data: anecdotes,
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
      return [...state, asObject(action.data)]
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
