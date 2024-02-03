const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog');
mongoose.set("bufferTimeoutMS", 30000);


beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('the first blog is about React Patterns', async () => {
    const response = await api.get('/api/blogs');
    const blogTitle = response.body.map(blog => blog.title);

    expect(response.body[0].title).toBe('React patterns');
    expect(blogTitle).toContainEqual('React patterns');
  })
})

describe('viewing a specific blog', () => {
  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs');

    response.body.map((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    })
  })
  test('succeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToView = await blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe(('addition of a new blog'), () => {
  test('adds a new blog post', async () => {
    const newBlog = {
      title: '(It will have to do) Until the real thing comes',
      author: 'Dexter Gordon',
      url: 'https://aswinginaffair.com/',
      likes: 100,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDB();
      const blogTitle = blogsAtEnd.map(blog => blog.title);

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      expect(blogTitle).toContainEqual('(It will have to do) Until the real thing comes');
  });

  test('blogs without title or url will respond with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Bob Dylan',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);


    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('blogs without likes will default to zero', async () => {
    const newBlog = {
      title: 'Georgia On My Mind',
      author: 'Ray Charles',
      url: 'https://raycharles.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);


    const blogsAtEnd = await helper.blogsInDB();
    const postedBlog = blogsAtEnd.filter(blog => blog.title === newBlog.title);

    expect(postedBlog[0]).toHaveProperty('likes');
    expect(postedBlog[0].likes).toBe(0);
  });
})

describe(('deletion of a blog post'), () => {
  test('deletes a blog post if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    const blogTitle = blogsAtEnd.map(blog => blog.title);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
    expect(blogTitle).not.toContainEqual(blogToDelete.title);
  });
});

describe(('update of a blog post'), () => {
  test('updates a blog post if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDB();
    const blog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id);
    expect(blog[0].likes).toBe(updatedBlog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});