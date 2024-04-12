const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})


const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};

      if (args.author) {
        console.log(args.author)
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
      console.log(context)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      try {
        if (!context.currentUser) throw new Error('Unauthenticated')
        if (args.title.length < 3) throw new Error('Title must be at least 3 characters long')
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          if (args.author.length < 4) throw new Error('Author must be at least 3 characters long')
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          author = await Author.findOne({ name: args.author })
        }

        const book = new Book({ ...args, author: author })
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
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})