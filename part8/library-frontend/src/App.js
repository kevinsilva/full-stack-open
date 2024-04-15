import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
        <div style={{marginBottom: '30px'}}>
          <Link to="/" style={{ marginRight: '10px' }}>authors</Link>
          <Link to="/books" style={{ marginRight: '10px' }}>books</Link>
          { token && <Link to="/add" style={{ marginRight: '10px' }}>add book</Link> }
          { !token && <Link to="/login">login</Link> }
          { token && <Link to="/" onClick={logout}>logout</Link> }
        </div>
        <div>
          <Notify errorMessage={error}/>
        </div>

        <Routes>
          <Route path='/' element={<Authors setError={(error) => setError(error)}/>}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/add' element={<NewBook setError={(error) => setError(error)}/>}/>
          <Route path='/login' element={<LoginForm setError={(error) => setError(error)} setToken={(token) => setToken(token)}/>}/>
        </Routes>
    </Router>
  )
}

export default App
