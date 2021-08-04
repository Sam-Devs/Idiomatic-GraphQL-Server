const { ApolloServer } = require("apollo-server");

// Types
const typesDef = `
type Query {
    info: String!
}
`

// Resolver
const resolvers = {
Query: {
    info: () => `This is an API of HackerNews Clone`
}}

// Server
const server = new ApolloServer({
    typesDef,
    resolvers,
})

server
.listen()
.then(({url}) => {
    console.log(`Server is running ${url}`);
})