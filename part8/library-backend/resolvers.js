const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return [];

        query = { author: author._id }
      }

      if (args.genre) {
        query = { ...query, genres: args.genre }
      }

      return Book.find(query).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      try {
        if (!context.currentUser) throw new Error('Unauthenticated')
        if (!args.author || !args.title || !args.published || !args.genres) throw new Error('All fields are required')
        if (args.title.length < 3) throw new Error('Title must be at least 3 characters long')
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          if (args.author.length < 4) throw new Error('Author must be at least 3 characters long')
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          author = await Author.findOne({ name: args.author })
        }

        const book = new Book({ ...args, author: author })

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book.save()
      } catch (error) {
        throw new GraphQLError(`Adding book failed: ${error.message}`, { extension: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args
        } })
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) throw new Error('Unauthenticated')
        const author = await Author.findOne({ name: args.name })
        if (!author) return null;

        return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
      } catch(error) {
        throw new GraphQLError('Editing author failed', { extension: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args
        } })
      }

    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError(`Creating user failed: ${error.message}`, { extension: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args
          } })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user && args.password !== 'secret') {
        throw new GraphQLError('Wrong credentials', { extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args
        } })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers