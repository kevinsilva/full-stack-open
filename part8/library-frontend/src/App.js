import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <Router>
        <div style={{marginBottom: '30px'}}>
          <Link to="/" style={{ marginRight: '10px' }}>authors</Link>
          <Link to="/books"style={{ marginRight: '10px' }}>books</Link>
          <Link to="/add">add book</Link>
        </div>

        <Routes>
          <Route path='/' element={<Authors />}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/add' element={<NewBook />}/>
        </Routes>
    </Router>
  )
}

export default App
