import { useSelector } from "react-redux"
import { useRef } from "react"
import LoginForm from "./LoginForm"
import { Toggable } from "./Toggable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"

export default function Home() {
  const user = useSelector((state) => state.user.userData)
  const blogFormRef = useRef()

  return (
    <div>
      {!user && <LoginForm />}
      {user && <div>
        <Toggable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm onNewBlog={() => { blogFormRef.current.toggleVisibility()}}/>
        </Toggable>
        <BlogList />
      </div>}
    </div>
  )
}
