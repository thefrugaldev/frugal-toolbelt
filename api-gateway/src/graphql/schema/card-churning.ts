import { gql } from "apollo-server";
import ICard from "../interfaces/ICard";
import CardChurningService from "../adapters/card-churning-service";

export const typeDef = gql`
  type Card {
    _id: ID!
    vendor: String!
    bank: String
    name: String!
  }

  extend type Mutation {
    createCard(vendor: String!, bank: String, name: String!): Card!
  }

  extend type Query {
    cards: [Card!]!
    card(id: ID!): Card!
  }
`;

export const resolvers = {
  Query: {
    card: async (obj: any, card: ICard) => {
      return await CardChurningService.fetchCardByIdAsync(card.id);
    },
    cards: async () => {
      return await CardChurningService.fetchAllCardsAsync();
    }
  },
  Mutation: {
    createCard: async (obj: any, card: ICard) => {
      return await CardChurningService.createCardAsync(card);
    }
  }
};
