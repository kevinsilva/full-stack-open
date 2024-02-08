const express = require('express');
const blogsRouter = express.Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) response.json(blog);
    else response.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes, userId } = request.body;
  const user = await User.findById(userId);

  if (!title) return response.status(400).json({error: 'title is missing'});
  if (!url) return response.status(400).json({error: 'url is missing'});

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user.id
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch(error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:_id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params._id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
