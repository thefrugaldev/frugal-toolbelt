import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import resolvers from "./graphql/resolvers/card-churning";
import typeDefs from "./graphql/resolvers/card-churning/type-defs";
import formatGraphQLErrors from "./graphql/helpers/error-handlers";

const apolloServer = new ApolloServer({
  formatError: formatGraphQLErrors,
  resolvers,
  typeDefs
});

const app = express();
const isDevelopment = app.get("env") === "development";
const whitelist: string[] = []; // TODO: stub out as env variables

if (isDevelopment) {
  // tslint:disable-next-line:no-console
  console.log(
    `😨 🚧 😨 🚧 😨 🚧 😨 🚧 Working in development environment, proceed with caution `
  );

  whitelist.push("http://localhost:3000", "http://localhost:8000");

  app.use(cookieParser());

  app.use(
    cors({
      origin: (origin, cb) =>
        whitelist.indexOf(origin) !== -1 || !origin // allows for server to server reqeuests
          ? cb(null, true)
          : cb(
              new Error(
                `🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → Origin ${origin} not allowed by CORS`
              )
            ),
      credentials: true
    })
  );
}

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

export default app;
