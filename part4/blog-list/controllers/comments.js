const express = require('express');
const commentsRouter = express.Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentsRouter.get('/:id/comments', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('comments', { content: 1 });
    if (blog) response.json(blog.comments)
    else response.status(404).end();
  } catch (error) {
    next(error);
  }
});

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const { content } = request.body;
  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(404).json({error: 'blog not found'});

  const comment = new Comment({
    content,
    blog: blog.id
  });

  try {
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment);
    await blog.save();

    response.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
})

module.exports = commentsRouter;