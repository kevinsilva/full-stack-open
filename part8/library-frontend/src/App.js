import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'

const App = () => {
  const [error, setError] = useState(null)

  return (
    <Router>
        <div style={{marginBottom: '30px'}}>
          <Link to="/" style={{ marginRight: '10px' }}>authors</Link>
          <Link to="/books"style={{ marginRight: '10px' }}>books</Link>
          <Link to="/add">add book</Link>
        </div>
        <div>
          <Notify errorMessage={error}/>
        </div>

        <Routes>
          <Route path='/' element={<Authors setError={(error) => setError(error)}/>}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/add' element={<NewBook setError={(error) => setError(error)}/>}/>
        </Routes>
    </Router>
  )
}

export default App
