import { useSelector } from "react-redux"
import { useRef } from "react"
import LoginForm from "./LoginForm"
import { Toggable } from "./Toggable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"
import { Grid } from "@mui/material"

export default function Home() {
  const user = useSelector((state) => state.user.userData)
  const blogFormRef = useRef()

  return (
    <Grid container spacing={4} justifyContent="center"
    alignItems="center" columns={{ xs: 4, md: 12 }}>
      <Grid item xs={6}>
      {!user && <LoginForm />}
      {user && <div>
        <Toggable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm onNewBlog={() => { blogFormRef.current.toggleVisibility()}}/>
        </Toggable>
        <BlogList />
      </div>}
      </Grid>
    </Grid>
  )
}
