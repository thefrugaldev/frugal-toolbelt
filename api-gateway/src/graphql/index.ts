import { typeDef as LineItem } from "./schema/line-item";
import { typeDef as Category } from "./schema/category";
import { typeDef as CardChurning } from "./schema/card-churning";
import { resolvers as lineItemResolvers } from "./resolvers/line-item";
import { resolvers as categoryResolvers } from "./resolvers/category";
import { resolvers as cardChurningResolvers } from "./resolvers/card-churning";
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
