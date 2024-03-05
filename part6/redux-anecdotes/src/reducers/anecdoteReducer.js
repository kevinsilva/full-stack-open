import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find((a) => a.id === id)
      console.log(JSON.parse(JSON.stringify(state)), anecdoteToChange)
      anecdoteToChange.votes++
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      // sets action.payload to new state
      return action.payload
    },
  },
})

export const { createAnecdote, vote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
