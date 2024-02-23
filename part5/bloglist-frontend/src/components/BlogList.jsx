import Blog from "./Blog"

export default function BlogList({ blogs }) {
  return (
    <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}
