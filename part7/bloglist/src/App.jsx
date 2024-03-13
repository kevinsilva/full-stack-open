import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './redux/reducers/notificationReducer'
import { initializeBlogs } from './redux/reducers/blogReducer'
import { getUser } from './redux/reducers/userReducer'
import Header from './components/Header'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import { Routes, Route, useMatch } from 'react-router-dom'
import { getAllUsers } from './redux/reducers/usersReducer'


const App = () => {
    const loggedUser = useSelector((state) => state.user.userData)
    const users = useSelector((state) => state.users.usersData)
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
      try {
        if (loggedUser) dispatch(initializeBlogs())
      } catch(error) {
        dispatch(
          setNotification({
              text: 'error fetching blogs',
              class: 'error',
          })
       )
      }
    },[dispatch, loggedUser, blogs])

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/users' element={<Users />}></Route>
                <Route path='/users/:id' element={<User />}></Route>
            </Routes>


        </div>
    )
}

export default App
