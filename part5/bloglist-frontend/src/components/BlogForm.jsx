import { useState } from "react"
import blogService from "../services/blogs"

export default function BlogForm({ onMessage, onNewBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    const addBlog = async () => {
      try {
        const newBlog = await blogService.create(blog)
        onNewBlog(newBlog)
        onMessage({
          text: `a new blog ${blog.title} by ${blog.author} added`,
          class: 'success'
        })
        setTimeout(() => onMessage({
          text: null,
          class: null
        }), 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      } catch {
        onMessage({
          text: 'error adding blog',
          class: 'error'
        })
        setTimeout(() => onMessage({
          text: null,
          class: null
        }), 5000)
      }
    }
    addBlog()
  }

  return (
    <div>
      <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        <label htmlFor="title">title:</label>
        <input value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
    </div>
  )
}
