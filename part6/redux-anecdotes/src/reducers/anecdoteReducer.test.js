import deepFreeze from 'deep-freeze'
import { reducer } from './anecdoteReducer'

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: "If it hurts, do it more often",
      id: "34817",
      votes: 0
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: "17620",
      votes: 0
    }
  ]

  test('vote is incremented', () => {
    const action = {
      type: 'ANECDOTE/VOTED',
      id: initialState[0].id
    }
    const state = initialState

    deepFreeze(state)
    let newState = reducer(state, action)
    newState = reducer(newState, action)

    expect(newState.find(x => x.id === initialState[0].id).votes).toEqual(2)
  })

  test('Creates a new anecdote', () => {
    const action = {
      type: 'ANECDOTE/CREATED',
      data: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
    }
    const state = initialState

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: action.data
        })
      ])
    )
  })
})
