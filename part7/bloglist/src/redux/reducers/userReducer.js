import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService, { setToken } from '../../services/blogs'
import loginService from '../../services/login'

const initialState = {
  userData: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        state.userData = action.payload
      },
      clearUser(state, action) {
        state.userData = null
      }
    }
})

export const getUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch(erro) {
      dispatch(
        setNotification({
            text: 'wrong username or password',
            class: 'error',
        })
      )
    }

  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearUser())
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer