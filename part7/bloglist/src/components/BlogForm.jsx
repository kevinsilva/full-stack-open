import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../redux/reducers/notificationReducer'
import { createBlog } from '../redux/reducers/blogReducer'

export default function BlogForm({ onNewBlog }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const handleCreate = (event) => {
        event.preventDefault()
        const blog = {
            title,
            author,
            url,
        }
        const addBlog = async () => {
            try {
                dispatch(createBlog(blog))
                onNewBlog()
                dispatch(
                    setNotification({
                        text: `a new blog ${blog.title} by ${blog.author} added`,
                        class: 'success',
                    })
                )
                setTitle('')
                setAuthor('')
                setUrl('')
            } catch {
                dispatch(
                    setNotification({
                        text: 'error adding blog',
                        class: 'error',
                    })
                )
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
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="write the title"
                    />
                </div>
                <div>
                    <label htmlFor="author">author:</label>
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="write the author"
                    />
                </div>
                <div>
                    <label htmlFor="url">url:</label>
                    <input
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="write the url"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
