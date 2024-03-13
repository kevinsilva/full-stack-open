import { useSelector } from 'react-redux'
import BlogPreview from './BlogPreview'

export default function BlogList() {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div className="blog-list">
            {sortedBlogs && sortedBlogs
                .map((blog) => (
                    <BlogPreview key={blog.id} blog={blog} />
                ))}
        </div>
    )
}
