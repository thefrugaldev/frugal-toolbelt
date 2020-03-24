import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/type-defs";

require("dotenv").config();

const port = process.env.PORT || 8000;

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs
});

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true
  })
);

apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

app.listen(port, "0.0.0.0", () => {
  console.log(`API gateway listening on ${port}`);
});
