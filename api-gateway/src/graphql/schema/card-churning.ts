import { gql } from "apollo-server";

export const typeDef = gql`
  type Card {
    _id: ID!
    vendor: String!
    bank: String
    name: String!
  }

  input CreateCardInput {
    _id: ID
    vendor: String!
    bank: String!
    name: String!
  }

  extend type Mutation {
    createCard(card: CreateCardInput!): Card!
  }

  extend type Query {
    cards: [Card!]!
    card(id: ID!): Card!
  }
`;
