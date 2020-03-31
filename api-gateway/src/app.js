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
let whitelist = []; //TODO: stub out as env variables

if (isDevelopment) {
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

  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, authorization"
  //   );
  //   res.header(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  //   );

  //   next();
  // });
}

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

module.exports = app;
