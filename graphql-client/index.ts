import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_COUNTRY_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
