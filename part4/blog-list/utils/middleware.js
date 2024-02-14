const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---');
  next();
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const userExtractor = async (request, response, next) => {
  if (request.method !== 'POST' && request.method !== 'DELETE') {
    request.user = null;
    return next();
  }

  try {
    const token = request.token;

    if (!token) {
      return response.status(401).json({ error: 'missing token' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'invalid user' });
    }

    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
}


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  } else {
    request.token = null;
  }

  return next();
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'mal formatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  userExtractor,
  tokenExtractor,
  errorHandler
}