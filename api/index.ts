import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import poses from "./data.json" assert { type: "json" };
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection for development
  });
startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
