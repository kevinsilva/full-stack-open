const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');

mongoose.set('strictQuery', false);
logger.info('connecting to database');

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error('error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

