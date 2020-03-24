import { gql } from "apollo-server";

const typeDefs = gql`
  type Card {
    _id: ID!
    vendor: String!
    bank: String
    name: String!
  }

  type Query {
    cards: [Card!]!
  }
`;

export default typeDefs;
