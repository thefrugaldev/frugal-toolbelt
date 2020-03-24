import { gql } from "apollo-server";

const typeDefs = gql`
  type Card {
    _id: ID!
    vendor: String!
    bank: String
    name: String!
  }

  type Mutation {
    createCard(vendor: String!, bank: String, name: String!): Card!
  }

  type Query {
    cards: [Card!]!
  }
`;

export default typeDefs;
