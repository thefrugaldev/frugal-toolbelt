import { gql } from "apollo-server";
import { typeDef as LineItem } from "./line-item";
import { typeDef as Category } from "./category";
import { typeDef as CardChurning } from "./card-churning";

const typeDef = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export default [typeDef, LineItem, Category, CardChurning];
