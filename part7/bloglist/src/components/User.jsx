import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function User() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.usersData);
  const user = users && users.find((user) => user.id === id);

  if (!user) return null

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
