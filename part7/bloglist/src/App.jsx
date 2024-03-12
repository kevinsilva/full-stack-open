import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './redux/reducers/notificationReducer'
import { initializeBlogs } from './redux/reducers/blogReducer'
import { getUser } from './redux/reducers/userReducer'
import Header from './components/Header'
import Home from './components/Home'
import Users from './components/Users'
import { Routes, Route, Link } from 'react-router-dom'


const App = () => {
    const user = useSelector((state) => state.user.userData)
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
      try {
        if (user) dispatch(initializeBlogs())
      } catch(error) {
        dispatch(
          setNotification({
              text: 'error fetching blogs',
              class: 'error',
          })
       )
      }
    },[dispatch, user, blogs])

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/users' element={<Users />}></Route>
            </Routes>


        </div>
    )
}

export default App
