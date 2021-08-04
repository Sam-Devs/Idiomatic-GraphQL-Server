const { ApolloServer } = require('apollo-server');

// Types
const typeDefs = `
  type Query {
    info: String!
    feed: [Links!]!
  }
  type Mutation {
      post(description: Strings!, url: Strings!): Links!
  }
  type Links {
      id: ID!
      description: String!
      url: String!
  }
`
// Links Object
let links = [{
    id: "link-0",
    description: "The first link",
    url: "'www.howtographql.com"
}]

// Resolver
const resolvers = {
  Query: {
    info: () => `This is Hacker News Clone API`,
    feed: () =>links
  },

  Links: {
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url
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