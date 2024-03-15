import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { List, ListItem, Typography } from "@mui/material";

export default function User() {
  const { id } = useParams();
  const users = useSelector((state) => state.users.usersData);
  const user = users && users.find((user) => user.id === id);

  if (!user) return null

  return (
    <div>
      {user && (
        <div>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6" sx={{ marginTop: "10px", color: "gray" }}>Added blogs</Typography>
          <List>
            {user.blogs.map(blog => (
              <ListItem key={blog.id}>{blog.title}</ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  )
}
