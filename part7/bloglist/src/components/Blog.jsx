import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../redux/reducers/notificationReducer'
import { likeBlog, removeBlog } from '../redux/reducers/blogReducer'

const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false)
    const userName = useSelector((state) => state.user.userData.name)
    const dispatch = useDispatch()

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
        <div className="blog-style">
            <div>
                {blog.title} {blog.author}
            </div>
            <button onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {showDetails && (
                <div>
                    <div>{blog.url}</div>
                    <div>
                        {blog.likes} likes{' '}
                        <button onClick={handleLike} id="like-button">
                            like
                        </button>
                    </div>
                    <div>{blog.user.name}</div>
                    {userName === blog.user.name && (
                        <button onClick={handleRemove} id="remove-button">
                            remove
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog
