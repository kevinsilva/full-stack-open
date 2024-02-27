import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import Title from './components/Title'
import { Toggable } from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: null,
    class: null
  })

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
    async function fetchData() {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        onMessage({
          text: 'error fetching blogs',
          class: 'error'
        })
        setTimeout(() => onMessage({
          text: null,
          class: null
        }), 5000)
      }
    }
    fetchData()
  }, [blogs])


  return (
    <div>
      <Title user={user}/>
      <Notification message={message} />

      {!user && <LoginForm onUserChange={(user) => setUser(user)} onMessage={(message) => setMessage(message)} />}

      {user && <>
        <LogoutButton user={user} onLogout={() => setUser(null)} />
        <Toggable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm onMessage={(message) => setMessage(message)} onNewBlog={(blog) => {
            setBlogs(blogs.concat(blog))
            blogFormRef.current.toggleVisibility()
            }} />
        </Toggable>
        <BlogList blogs={blogs} />
        </>}
    </div>
  )
}

export default App