import { useState, useEffect } from "react"
import { useMutation, useQuery } from '@apollo/client'

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const UpdateForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

  const { data } = useQuery(ALL_AUTHORS)

  const [ setBirthYear, result ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('person not found')
    }
  }, [result.data, setError])

  const handleUpdate = (event) => {
    event.preventDefault()
    setBirthYear({ variables: { name, setBornTo: Number(bornYear) } })

    setName('')
    setBornYear('')
    setError(null)
  }

  return (
    <div>
      <h3>Set Birthyear</h3>
      <form onSubmit={handleUpdate}>
       author <select value={name} onChange={({ target }) => setName(target.value)}>
        <option key='0' value="">select author</option>
        {data.allAuthors.map((author) => (
          <option key={author.name} value={author.name}>{author.name}</option>
        ))}
      </select>
      <div style={{ marginBottom: '10px' }}>
          born <input value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
      </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateForm