import { createSlice } from "@reduxjs/toolkit";
import blogService from '../../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload.id
      const blogToLike = state.find((b) => b.id === id)

      console.log(JSON.parse(JSON.stringify(state)))
      blogToLike.likes++
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update({...blog, likes: blog.likes + 1})
    dispatch(like(likedBlog))
  }
}

export const { setBlogs, addBlog, like } = blogSlice.actions
export default blogSlice.reducer