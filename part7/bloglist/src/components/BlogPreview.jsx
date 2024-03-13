import { Link } from 'react-router-dom'

const BlogPreview = ({ blog }) => {
    return (
        <div className="blog-style">
            <Link to={`/blogs/${blog.id}`}>
            <div>
                {blog.title} {blog.author}
            </div>
            </Link>
        </div>
    )
}

export default BlogPreview
