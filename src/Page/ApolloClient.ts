// ApolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:5000/graphql", // Your GraphQL server URL
    credentials: "include", // Include cookies for authentication (if needed)
  }),
  cache: new InMemoryCache(),
});

export default client;
