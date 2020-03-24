import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/type-defs";
import formatGraphQLErrors from "#root/helpers/error-handlers";

const apolloServer = new ApolloServer({
  formatError: formatGraphQLErrors,
  resolvers,
  typeDefs
});

const app = express();
const isDevelopment = app.get("env") === "development";

if (isDevelopment) {
  console.log(
    `😨 🚧 😨 🚧 😨 🚧 😨 🚧 Working in development environment, proceed with caution `
  );

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );

    next();
  });
}

app.use(cookieParser());

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

module.exports = app;
