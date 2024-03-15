import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { likeBlog, removeBlog, addComment } from "../redux/reducers/blogReducer"
import { setNotification } from "../redux/reducers/notificationReducer"
import { useNavigate } from "react-router-dom";
import { Typography, Link, Button, Box, ListItem, List, TextField, Paper, Divider } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function BlogPost() {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs)
  const userName = useSelector((state) => state.user.userData?.name)
  const blog = blogs?.find((blog) => blog.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blogs) return null

  const handleLike = async () => {
    try {
        dispatch(likeBlog(blog))
        dispatch(
          setNotification({
              text: `the blog ${blog.title} by ${blog.author} was liked`,
              class: 'success',
          })
      )
    } catch (error) {
        dispatch(
            setNotification({ text: 'error adding like', class: 'error' })
        )
    }
}

  const handleRemove = async () => {
  if (window.confirm('Are you sure you want to remove this blog?')) {
      try {
          const blogTitle = blog.title
          const blogAuthor = blog.author

          dispatch(removeBlog(blog.id))
          dispatch(
            setNotification({
                text: `the blog ${blogTitle} by ${blogAuthor} was removed`,
                class: 'success',
            })
        )
        navigate('/')
      } catch (error) {
          dispatch(
              setNotification({
                  text: 'error removing blog',
                  class: 'error',
              })
          )
      }
  }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
        const comment = event.target.comment.value
        event.target.comment.value = ''
        if (!comment) throw new Error('empty comment')
        dispatch(addComment(blog.id, comment))
        dispatch(
          setNotification({
              text: `comment added`,
              class: 'success',
          })
        )
    } catch(error) {
      if (error.message === 'empty comment') {
        dispatch(
            setNotification({
                text: 'empty comment',
                class: 'error',
            })
        )
      } else {
        dispatch(
            setNotification({
                text: 'error adding comment',
                class: 'error',
            })
        )
      }
    }
  }

  return (
    <>
    {blog && (
      <div className="blog">
        <Typography variant="h4" sx={{marginBottom: '25px'}}>{blog.title}</Typography>
        <Link href={blog.url} target="_blank" underline="none" rel="noopener">
          {blog.url}
        </Link>
        <Typography sx={{marginTop: '5px'}}>added by {blog.author}</Typography>
        <Box sx={{ display: 'flex', alignSelf: 'flex-end' }}>
          <Button variant="contained" onClick={handleLike} sx={{ alignSelf: 'flex-start' }}>
            <Typography>{blog.likes} likes</Typography>
          </Button>
          {userName === blog.user.name && (
                        <Button variant="text" onClick={handleRemove} id="remove-button">
                            delete post
                        </Button>
                    )}
          </Box>
        {blog.comments && (
        <Box mt={2} >
          <Typography variant="h5" sx={{marginBottom: '25px'}}>Comments</Typography>
          <form onSubmit={handleComment} id="comment-form">
            <TextField label="write comment" name="comment" />
            <Button type="submit" variant="text" sx={{ alignSelf: 'flex-end' }}>Add Comment</Button>
          </form>
          <List>
            {blog.comments.map((comment) => (
                <div key={comment.id}>
                <ListItem key={comment.id}>{comment.content}</ListItem>
                <Divider />
                </div>
            ))}
          </List>
        </Box>
        )}
      </div>
    )}
    </>
  )
}
