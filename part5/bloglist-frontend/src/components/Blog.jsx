import { useState } from "react"
import blogService from "../services/blogs"
const Blog = ({ blog }) => {
    const [showDetails, setShowDetails] = useState(false)

    const handleLike = async () => {
        const newBlogLike = { ...blog, likes: blog.likes + 1 }
        try {
            await blogService.update(newBlogLike)
        } catch (error) {
            console.log(error)
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
        </div>}
    </div>



)}

export default Blog