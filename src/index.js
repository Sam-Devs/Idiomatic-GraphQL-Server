const { ApolloServer } = require('apollo-server');
const { PrismaClient} = require("@prisma/client");
const fs = require("fs")
const path = require("path");

const prisma = new PrismaClient();

// Resolver
const resolvers = {
  Query: {
    info: () => `This is Hacker News Clone API`,
    feed: async (parent, args, context, info) => {
        return context.prisma.link.findMany()
    }
  },

  Mutation: {
      post: (parent, args, context) => {
          const newLink = context.prisma.link.create({
              data: {
                  description: args.description,
                  url: args.url,
              }
          })
          return newLink;
      },
  },
}

// Server
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
      ),
      resolvers,
      context: {
        prisma,
      }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );