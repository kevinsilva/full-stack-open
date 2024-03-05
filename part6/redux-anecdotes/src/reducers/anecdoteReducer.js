import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find((a) => a.id === id)
      console.log(JSON.parse(JSON.stringify(state)), anecdoteToChange)
      anecdoteToChange.votes++
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      // sets action.payload to new state
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdoteToUpdate = await anecdotesService.getById(id)
    const updatedAnecdote = await anecdotesService.updateVote(id, {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    })
    dispatch(vote(updatedAnecdote))
  }
}

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
