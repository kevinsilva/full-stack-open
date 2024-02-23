import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({
    text: null,
    class: null
  })

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
  }, [user])


  return (
    <div>
      <h1>{user ? 'blogs' : 'log in to application'}</h1>
      <Notification message={message} />


      {user === null ?
        <LoginForm onUserChange={(user) => setUser(user)} onMessage={(message) => setMessage(message)} /> : <>
        <LogoutButton user={user} onLogout={() => setUser(null)} />
        <BlogForm onMessage={(message) => setMessage(message)} onNewBlog={(blog) => setBlogs(blogs.concat(blog))} />
        <BlogList blogs={blogs} />
        </>
      }
    </div>
  )
}

export default App