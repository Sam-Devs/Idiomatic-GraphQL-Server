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

  Mutation: {
      post: (parent, args) => {
          let idCount = links.length;

          const link = {
              id: `link ${idCount++}`,
              description: args.description,
              url: args.url
          }
          links.push(link);
          return link;
      }
  },
}

// Server
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
      path.join(__dirname, "schema.graphql"),
      "utf-8"
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );