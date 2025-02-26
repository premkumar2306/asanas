import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";
import typeDefs from "../graphql/typeDefs";
import resolvers from "../graphql/resolvers";

describe("Apollo Server", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await startStandaloneServer(server, { listen: { port: 0 } });
  });

  afterAll(async () => {
    await server.stop();
  });

  it("should return hello world", async () => {
    const result = await server.executeOperation({
      query: gql`
        query {
          hello
        }
      `,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.hello).toBe("Hello world!");
  });
});
