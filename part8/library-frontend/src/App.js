import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, ALL_BOOKS_BY_GENRE } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, (data) => {
    console.log(data)
    const { allBooks } = data || {}
    if (!allBooks) return data
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      alert(`added ${addedBook.title} by ${addedBook.author.name}`)

      updateCache(client.cache, { query: ALL_BOOKS_BY_GENRE}, addedBook)
    },
    onError: (error) => {
      console.error('subscription error', error)
      setError('Subscription error occurred');
    }
  })
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('library-user-token')
    if (storedToken) setToken(storedToken)
  }, [])

  return (
    <Router>
        <div style={{marginBottom: '30px'}}>
          <Link to="/" style={{ marginRight: '10px' }}>authors</Link>
          <Link to="/books" style={{ marginRight: '10px' }}>books</Link>
          { token && <Link to="/add" style={{ marginRight: '10px' }}>add book</Link> }
          { token && <Link to="/recommendations" style={{ marginRight: '10px' }}>recommend</Link> }
          { !token && <Link to="/login">login</Link> }
          { token && <Link to="/" onClick={logout}>logout</Link> }
        </div>
        <div>
          <Notify errorMessage={error} resetError={() => setError(null)}/>
        </div>

        <Routes>
          <Route path='/' element={<Authors setError={(error) => setError(error)}/>}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/add' element={<NewBook setError={(error) => setError(error)}/>}/>
          <Route path='/recommendations' element={<Recommendations />}/>
          <Route path='/login' element={<LoginForm setError={(error) => setError(error)} setToken={(token) => setToken(token)}/>}/>
        </Routes>
    </Router>
  )
}

export default App
