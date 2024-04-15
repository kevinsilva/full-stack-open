import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [ selectedGenre, setSelectedGenre ] = useState(null)

  if (loading) return <div>loading...</div>

  const bookGenres = data && [...new Set(data.allBooks.map((book) => book.genres).flat())]

  const filteredBooks = data && selectedGenre ? data.allBooks.filter((book) => book.genres.includes(selectedGenre)) : data.allBooks

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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {bookGenres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
