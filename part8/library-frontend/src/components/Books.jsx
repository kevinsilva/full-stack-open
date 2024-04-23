import { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS_BY_GENRE } from "../queries"

const Books = (props) => {
  const [ bookGenres, setBookGenres ] = useState(null)
  const [getBooksByGenre, { loading, data }] = useLazyQuery(ALL_BOOKS_BY_GENRE)

  useEffect(() => {
    if (data && !bookGenres) {
      setBookGenres([...new Set(data.allBooks.map((book) => book.genres).flat())])
    }
  }, [data, bookGenres])

  useEffect(() => {
    getBooksByGenre()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data && data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {bookGenres && bookGenres.map((genre) => (
          <button key={genre} onClick={() => getBooksByGenre({ variables: { genre: genre } })}>{genre}</button>
        ))}
        <button onClick={() => getBooksByGenre()}>all genres</button>
      </div>
    </div>
  )
}

export default Books
