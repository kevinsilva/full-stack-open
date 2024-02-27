import { useState } from "react"
import blogService from "../services/blogs"
const Blog = ({ blog, userInfo, onMessage }) => {
    const [showDetails, setShowDetails] = useState(false)
    const handleLike = async () => {
        const newBlogLike = { ...blog, likes: blog.likes + 1 }
        try {
            await blogService.update(newBlogLike)
        } catch (error) {
            console.error(error)
            onMessage({
                text: 'error adding like',
                class: 'error'
            })
            setTimeout(() => onMessage({
                text: null,
                class: null
            }), 5000)
        }
    }

    const handleRemove = async () => {
        if(window.confirm('Are you sure you want to remove this blog?')) {
            try {
                await blogService.remove(blog.id)
            } catch (error) {
                console.error(error)
                onMessage({
                    text: 'error removing blog',
                    class: 'error'
                })
                setTimeout(() => onMessage({
                    text: null,
                    class: null
                }), 5000)
            }
        }
    }

    return (
    <div className="blog-style">
        <div>{blog.title} {blog.author}</div>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
        {showDetails && <div>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
            <div>{blog.user.name}</div>
            {userInfo === blog.user.name && <button onClick={handleRemove}>remove</button>}
        </div>}
    </div>



)}

export default Blog