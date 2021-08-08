const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION/SET':
      return action.notification
    default:
      return state
  }
}

const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION/SET',
      notification: notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION/SET',
        notification: notification,
      })
    }, timeout * 1000)
  }
}

export { notificationReducer, setNotification }
