import { useState, useEffect } from "react"
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const UpdateForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [bornYear, setBornYear] = useState('')

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
      <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
      </div>
      <div>
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