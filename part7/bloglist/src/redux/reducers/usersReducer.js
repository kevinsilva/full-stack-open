import { createSlice } from "@reduxjs/toolkit";
import usersService from '../../services/users'

const initialState = {
  usersData: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.usersData = action.payload
    },
  }
})

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch(setUsers(users))
    } catch(error) {
      console.error(error)
    }
    }
  }

  export const { setUsers } = usersSlice.actions
  export default usersSlice.reducer