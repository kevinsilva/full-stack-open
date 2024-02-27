import Blog from './Blog'

export default function BlogList({ blogs, userInfo, onMessage }) {
  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} userInfo={userInfo} onMessage={onMessage}/>
      )}
    </div>
  )
}
