import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter)
    )
  )

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted: '${anecdote.content}'`, 3))
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
