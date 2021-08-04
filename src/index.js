const { ApolloServer } = require('apollo-server');
const fs = require("fs")
const path = require("path");

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
  typeDefs: fs.readFileSync(
      path.join(__dirname, "schema.graphql")
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );