let timer = null

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NOTIFICATION/SET':
    return action.notification
  default:
    return state
  }
}

const setNotification = (notification, timeout) => {
  if (timer !== null) {
    clearInterval()
  }
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION/SET',
      notification: notification,
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION/SET',
        notification: '',
      })
    }, timeout * 1000)
  }
}

export { notificationReducer, setNotification }
