import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: null,
    class: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action) {
            state.text = action.payload.text,
            state.class = action.payload.class
        },
        clearNotification(state) {
            state.text = null,
            state.class = null
        }
    }
})

export const setNotification = (content) => {
    return (dispatch) => {
        clearTimeout()
        dispatch(addNotification(content))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
