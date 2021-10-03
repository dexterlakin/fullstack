import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  if (props.notification === '') {
    return null
  }

  let className = 'notification'
  if (props.notification.includes('Wrong credentials') || props.notification.includes('validation failed')) {
    className = 'error'
  }

  return (
    <div className={className}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
