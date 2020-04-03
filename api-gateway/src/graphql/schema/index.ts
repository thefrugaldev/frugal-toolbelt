import { typeDef as Budget, resolvers as budgetResolvers } from "./budget";
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
  typeDefs: [Query, Mutation, Budget, CardChurning],
  resolvers: merge(resolvers, budgetResolvers, cardChurningResolvers)
});
