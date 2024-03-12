import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import Title from './components/Title'
import { Toggable } from './components/Toggable'
import { setNotification } from './redux/reducers/notificationReducer'
import { initializeBlogs } from './redux/reducers/blogReducer'
import { getUser } from './redux/reducers/userReducer'

const App = () => {
    const user = useSelector((state) => state.user.userData)
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()
    const blogFormRef = useRef()

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
            <Title user={user} />
            <Notification />
            {!user && <LoginForm />}
            {user && (
                <>
                    <LogoutButton user={user} />
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
