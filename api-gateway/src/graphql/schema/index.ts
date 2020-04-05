import {
  typeDef as LineItem,
  resolvers as lineItemResolvers
} from "./line-item";
import {
  typeDef as Category,
  resolvers as categoryResolvers
} from "./category";
import {
  typeDef as CardChurning,
  resolvers as cardChurningResolvers
} from "./card-churning";
import { gql, makeExecutableSchema } from "apollo-server";
import { merge } from "lodash";

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, LineItem, Category, CardChurning],
  resolvers: merge(
    resolvers,
    lineItemResolvers,
    categoryResolvers,
    cardChurningResolvers
  )
});
