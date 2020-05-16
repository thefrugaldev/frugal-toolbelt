import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import { auth } from "../lib/firebase";

const cache = new InMemoryCache({
  addTypename: false,
});

const httpLink = createHttpLink({
  credentials: "include",
  uri: process.env.SERVICES_URI + "/graphql",
  fetch: fetch,
});

const authLink = setContext(async (req, { headers }) => {
  const token = await auth.currentUser?.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export default client;
