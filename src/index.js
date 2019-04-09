const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const { applyMiddleware } = require('graphql-middleware')
const { importSchema } = require('graphql-import')

const postmark = require('postmark')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const db = require('./db')
const resolvers = require('./resolvers')
const loaders = require('./loaders')
const permissions = require('./permissions')
const typeDefs = importSchema('./src/schema.graphql'),

const { getUserId } = require('./utils')

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({
      typeDefs,
      resolvers,
      inheritResolversFromInterfaces: true
    }),
    permissions
  ),
  context: async req => ({
    ...req,
    db,
    loaders,
    postmark: new postmark.ServerClient(process.env.POSTMARK_KEY),
    stripe,
    userId: await getUserId({ ...req })
  }),
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})
