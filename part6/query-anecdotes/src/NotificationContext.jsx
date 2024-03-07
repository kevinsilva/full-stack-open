import { createContext, useEffect, useReducer } from 'react'

const initialState = { message: '' }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { message: action.message }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification.message])

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
