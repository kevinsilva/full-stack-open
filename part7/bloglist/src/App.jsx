import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import Title from './components/Title'
import { Toggable } from './components/Toggable'
import { setNotification } from './redux/reducers/notificationReducer'
import { initializeBlogs } from './redux/reducers/blogReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
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
    },[dispatch, user])

    return (
        <div>
            <Title user={user} />
            <Notification />

            {!user && <LoginForm onUserChange={(user) => setUser(user)} />}

            {user && (
                <>
                    <LogoutButton user={user} onLogout={() => setUser(null)} />
                    <Toggable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm
                            onNewBlog={() => {
                                blogFormRef.current.toggleVisibility()
                            }}
                        />
                    </Toggable>
                    <BlogList userInfo={user.name} />
                </>
            )}
        </div>
    )
}

export default App
