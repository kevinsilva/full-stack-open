import { useQuery } from "@apollo/client"
import { USER, ALL_BOOKS } from "../queries"

export default function Recommendations() {
  const { loading, data } = useQuery(USER)
  const { loading: loadingBooks, data: dataBooks } = useQuery(ALL_BOOKS)

  if (loading || loadingBooks) return <div>loading...</div>
  if (!data) return <div>not logged in</div>
  if (!dataBooks) return <div>no books to recommend. please update your favorite genre</div>

  const filteredBooks = data && dataBooks.allBooks.filter((book) => book.genres.includes(data.me.favoriteGenre))

  return (
    <div>
      <h2>Recomendations</h2>
      <p>books in your favorite genre <b>{data && data.me.favoriteGenre}</b></p>
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
    </div>
  )
}
