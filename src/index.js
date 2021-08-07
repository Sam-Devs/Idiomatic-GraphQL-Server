const { ApolloServer } = require('apollo-server');
const { PrismaClient} = require("@prisma/client");
const { getUserId } = require("../src/utils")
const fs = require("fs")
const path = require("path");

const Query = require("../resolvers/Query")
const Mutation = require("../resolvers/Mutation")
const Link = require("../resolvers/Link")
const User = require("../resolvers/User")

const prisma = new PrismaClient();

// Resolver
const resolvers = {
  Query,
  Mutation,
  Link,
  User
}

// Server
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
      resolvers,
      context: ({req}) => {
        return {
          ...req,
          prisma,
          userId:
          req && req.authorization
          ? getUserId(req)
          : null
        }
      }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );