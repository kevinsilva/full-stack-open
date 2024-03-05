import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.message = action.payload
    },
    clearNotification(state) {
      state.message = ''
    },
  },
})

export const setNotification = (content, displayTime) => {
  return (dispatch) => {
    clearTimeout(window.clearTimeout)
    dispatch(addNotification(content))

    setTimeout(() => {
      dispatch(clearNotification())
    }, displayTime * 1000)
  }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
