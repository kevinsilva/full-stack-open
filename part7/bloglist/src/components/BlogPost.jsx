import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { likeBlog } from "../redux/reducers/blogReducer"
import { removeBlog } from "../redux/reducers/blogReducer"
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
      </div>
    )}
    </>
  )
}
