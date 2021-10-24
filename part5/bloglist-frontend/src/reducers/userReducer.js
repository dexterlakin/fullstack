import blogService from '../services/blogs'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER/LOGIN':
      // storing user tokens in Redux store doesn't seem like a good idea
      window.localStorage.setItem(
        'blogAppUserToken', JSON.stringify(action.user.token.replace(/['"]+/g, ''))
      )
      blogService.setToken(action.user.token)
      delete (action.user.token)
      return action.user
    case 'USER/LOGOUT':
      return {}
    default:
      return state
  }
}

const login = (user) => {
  return async dispatch => {
    dispatch({
      type: 'USER/LOGIN',
      user: user
    })
  }
}

const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'USER/LOGOUT'
    })
  }
}

export { userReducer, login, logout }
