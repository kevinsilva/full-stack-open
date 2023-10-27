const _ = require('lodash');

const dummy = (_blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce(
    (maxLikesBlog, blog) =>
      blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog,
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authors = _.countBy(blogs, 'author');
  const authorNames = _.keys(authors);

  const authorWithMostBlogs = _.maxBy(
    authorNames,
    (authorName) => authors[authorName]
  );

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = _.countBy(blogs, 'author');
  const authorNames = _.keys(authors);

  const authorWithMostLikes = _.maxBy(authorNames, (authorName) =>
    _.sumBy(blogs, (blog) => (blog.author === authorName ? blog.likes : 0))
  );

  const maxNumberOfLikes = _.sumBy(blogs, (blog) =>
    blog.author === authorWithMostLikes ? blog.likes : 0
  );

  return {
    author: authorWithMostLikes,
    likes: maxNumberOfLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
