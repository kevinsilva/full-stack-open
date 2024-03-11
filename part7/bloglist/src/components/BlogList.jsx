import Blog from './Blog'

export default function BlogList({ blogs, userInfo }) {
    return (
        <div className="blog-list">
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} userInfo={userInfo} />
                ))}
        </div>
    )
}
