import { gql } from "apollo-server";

export const typeDef = gql`
  type Category {
    _id: ID!
    name: String!
    icon: String!
    isActive: Boolean
    #TODO: Add date resolver to root
    # created: Date
  }

  input CreateCategoryInput {
    _id: ID
    name: String!
    icon: String
  }

  extend type Mutation {
    createCategory(category: CreateCategoryInput!): Category!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }
`;
