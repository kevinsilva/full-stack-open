const blogsRouter = require('express').Router();
const Blog = require('..models/blog');

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) response.json(blog);
      else response.status(404).end();
  })
    .catch((error) => next(error));
});

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;
  const blog = new Blog(body);

  blog.save()
    .then((savedBlog) => {
    response.status(201).json(savedBlog);
  })
    .catch((error) => next(error));
});

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findIdAndRemove(request.params.id)
  .then(() => {
    response.status(204).end();
  }).catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body;
  const blog = body.content

  Blog.findIdAndUpdate(request.params.id, note, { new: true }).then((updatedBlog) => {
    response.json(updatedBlog);
  }).catch((error) => next(error));
});


  module.exports =  blogsRouter;