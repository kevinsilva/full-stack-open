import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification.message)

  useEffect(() => {
    if (notification && notification !== '') {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '20px',
  }

  return notification && <div style={style}>{notification}</div>
}

export default Notification
