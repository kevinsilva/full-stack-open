import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { likeBlog, removeBlog, addComment } from "../redux/reducers/blogReducer"
import { setNotification } from "../redux/reducers/notificationReducer"
import { useNavigate } from "react-router-dom";

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
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.author}</div>
        {userName === blog.user.name && (
                        <button onClick={handleRemove} id="remove-button">
                            remove
                        </button>
                    )}
        {blog.comments && (
        <div>
          <h3>Comments</h3>
          <form onSubmit={handleComment}>
            <input name="comment" />
            <button type="submit">add comment</button>
          </form>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </div>
        )}
      </div>
    )}
    </>
  )
}
