const bcrypt = require('bcrypt');
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDB()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
})

test('creation fails with proper status code and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDB();

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  };

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();

    expect(result.body.error).toContain('expected `username` to be unique');
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
})
test('creation fails with proper status code and message if password is too short', async () => {
  const usersAtStart = await helper.usersInDB()

  const newUser = {
    username: 'user',
    name: 'User',
    password: 'pa',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()

    expect(result.body.error).toContain('Password must be at least 3 characters long')
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with proper status code and message if username is too short', async () => {
  const usersAtStart = await helper.usersInDB()

  const newUser = {
    username: 'us',
    name: 'User',
    password: 'password',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDB()

  expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})
})