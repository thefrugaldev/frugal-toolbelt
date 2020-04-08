import { gql } from "apollo-server";

export const typeDef = gql`
  scalar Date

  type LineItem {
    _id: ID!
    title: String!
    category: Category
    description: String
    amount: Int
    isSavings: Boolean
    date: Date!
  }

  input CreateLineItemInput {
    _id: ID
    title: String!
    category: ID
    description: String
    amount: Int
    isSavings: Boolean
    date: Date!
  }

  extend type Mutation {
    createLineItem(lineItem: CreateLineItemInput!): LineItem!
  }

  extend type Query {
    lineItems: [LineItem!]!
    lineItem(id: ID!): LineItem!
  }
`;
