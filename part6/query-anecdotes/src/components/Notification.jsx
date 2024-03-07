import { useContext, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return notification.message ? (
    <div style={style}>{notification.message}</div>
  ) : null
}

export default Notification
