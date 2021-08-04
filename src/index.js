const { ApolloServer } = require('apollo-server');

// Types
const typeDefs = `
  type Query {
    info: String!
  }
`

// Resolver
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

// Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );