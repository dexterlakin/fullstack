import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

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
      type: 'ANECDOTE/VOTE',
      data: {
        id: initialState[0].id
      }
    }
    const state = initialState

    deepFreeze(state)
    let newState = reducer(state, action)
    newState = reducer(newState, action)

    expect(newState.find(x => x.id === initialState[0].id).votes).toEqual(2)
  })

  // test('ok is incremented', () => {
  //   const action = {
  //     type: 'OK'
  //   }
  //   const state = initialState

  //   deepFreeze(state)
  //   const newState = counterReducer(state, action)
  //   expect(newState).toEqual({
  //     good: 0,
  //     ok: 1,
  //     bad: 0
  //   })
  // })

  // test('bad is incremented', () => {
  //   const action = {
  //     type: 'BAD'
  //   }
  //   const state = initialState

  //   deepFreeze(state)
  //   const newState = counterReducer(state, action)
  //   expect(newState).toEqual({
  //     good: 0,
  //     ok: 0,
  //     bad: 1
  //   })
  // })

  // test('zero resets all stats', () => {
  //   const action = {
  //     type: 'ZERO'
  //   }
  //   const state = initialState

  //   deepFreeze(state)
  //   const newState = counterReducer(state, action)
  //   expect(newState).toEqual({
  //     good: 0,
  //     ok: 0,
  //     bad: 0
  //   })
  // })
})
