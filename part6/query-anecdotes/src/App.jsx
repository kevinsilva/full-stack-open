import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import NotificationContext from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (_, newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const anecdoteIndex = anecdotes.findIndex((a) => a.id === newAnecdote.id)
      const newAnecdotes = [
        ...anecdotes.slice(0, anecdoteIndex),
        newAnecdote,
        ...anecdotes.slice(anecdoteIndex + 1),
      ]
      queryClient.setQueryData(['anecdotes'], newAnecdotes)
    },
  })

  const handleVote = (anecdote) => {
    const newVote = anecdote.votes + 1
    voteAnecdoteMutation.mutate({ ...anecdote, votes: newVote })
    notificationDispatch({
      type: 'ADD_NOTIFICATION',
      message: `anecdote '${anecdote.content}' voted`,
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.content}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
