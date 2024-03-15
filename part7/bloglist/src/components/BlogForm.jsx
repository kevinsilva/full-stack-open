import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../redux/reducers/notificationReducer'
import { createBlog } from '../redux/reducers/blogReducer'
import { Paper, Typography, TextField, Button } from '@mui/material'

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
        <Paper elevation={3} sx={{ padding: '50px 100px', textAlign: 'center'}}>
            <Typography variant='h5' color={'textSecondary'}>create new</Typography>
            <form onSubmit={handleCreate}>
            <TextField label="title" value={title} onChange={({ target }) => setTitle(target.value)} size='small' margin='normal' fullWidth required/>
            <TextField label="author" value={author} onChange={({ target }) => setAuthor(target.value)} size='small' margin='normal' fullWidth required/>
            <TextField label="url" value={url} onChange={({ target }) => setUrl(target.value)} size='small' margin='normal' fullWidth required/>
            <Button variant='contained' color='primary' type='submit' sx={{ marginTop: '20px' }} disableElevation>create</Button>
            </form>
        </Paper>
    )
}
