import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { makeExecutableSchema } from "apollo-server";
import { formatGraphQLErrors } from "./graphql/helpers/api-utils";
import * as firebase from "./lib/firebase-service";

const apolloServer = new ApolloServer({
  formatError: formatGraphQLErrors,
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  context: async ({ req }) => {
    const token =
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
        ? req.headers.authorization.split(" ")[1]
        : null;

    let user;

    if (token) {
      user = await firebase.default.auth().verifyIdToken(token);
    }

    return { user };
  },
});

const app = express();
const isDevelopment = app.get("env") === "development";
const whitelist: string[] = []; // TODO: stub out as env variables

dotenv.config();

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
      credentials: true,
    })
  );
}

firebase.initialize();

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

export default app;
