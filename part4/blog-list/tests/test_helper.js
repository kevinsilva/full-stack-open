const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDB,
  nonExistingId
}