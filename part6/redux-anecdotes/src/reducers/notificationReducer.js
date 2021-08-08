const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFICATION/SET':
      return action.notification
    default:
      return state
  }
}

const setNotification = (notification) => {
  return (
    {
      type: 'NOTIFICATION/SET',
      notification: notification,
    }
  )
}

export { notificationReducer, setNotification }
