import { useSelector } from 'react-redux'
import Blog from './Blog'

export default function BlogList({ userInfo }) {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div className="blog-list">
            {sortedBlogs
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} userInfo={userInfo} />
                ))}
        </div>
    )
}
