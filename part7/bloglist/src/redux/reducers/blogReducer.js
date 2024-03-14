import { createSlice } from "@reduxjs/toolkit";
import blogService from '../../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    pushBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const id = action.payload.id
      const blogToLike = state.find((b) => b.id === id)

      console.log(JSON.parse(JSON.stringify(state)))
      blogToLike.likes++
    },
    popBlog(state, action) {
      const id = action.payload.id
      return state.filter((b) => b.id  !== id)
    },
    pushComment(state, action) {
      state.push(action.payload)
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
    dispatch(pushBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update({...blog, likes: blog.likes + 1})
    dispatch(like(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(popBlog({ id }))
  }
}

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, { content: comment })
    dispatch(pushComment(newComment))
  }
}

export const { setBlogs, pushBlog, like, popBlog, pushComment } = blogSlice.actions
export default blogSlice.reducer