const { ApolloServer } = require('apollo-server');

// Types
const typeDefs = `
  type Query {
    info: String!
    feed: [Links!]!
  }
  type Links {
      id: ID!
      subscription: String!
      url: String!
  }
`

// Resolver
const resolvers = {
  Query: {
    info: () => `This is Hacker News Clone API`
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