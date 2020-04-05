import { gql } from "apollo-server";
import ILineItem from "../interfaces/ILineItem";
import LineItemService from "../adapters/line-item-service";

export const typeDef = gql`
  type LineItem {
    _id: ID!
    title: String!
    categoryId: Int!
    description: String!
    amount: String!
    isSavings: Boolean
  }

  extend type Mutation {
    createLineItem(
      title: String!
      description: String!
      isSavings: Boolean
      amount: Int!
    ): LineItem!
  }

  extend type Query {
    lineItems: [LineItem!]!
    lineItem(id: ID!): LineItem!
  }
`;

export const resolvers = {
  Query: {
    lineItems: async () => {
      return await LineItemService.fetchLineItemsAsync();
    },
    lineItem: async (obj: any, lineItem: ILineItem) => {
      return await LineItemService.fetchLineItemByIdAsync(lineItem.id);
    }
  },
  Mutation: {
    createLineItem: async (obj: any, lineItem: ILineItem) => {
      return await LineItemService.createLineItemAsync(lineItem);
    }
  }
};
