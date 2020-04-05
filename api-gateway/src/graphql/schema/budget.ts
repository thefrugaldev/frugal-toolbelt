import { gql } from "apollo-server";
import ILineItem from "../interfaces/ILineItem";
import BudgetService from "../adapters/budget-service";

export const typeDef = gql`
  type LineItem {
    _id: ID!
    title: String!
    categoryId: Int!
    description: String!
    amount: Int!
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
      return await BudgetService.fetchLineItemsAsync();
    },
    lineItem: async (obj: any, lineItem: ILineItem) => {
      return await BudgetService.fetchLineItemByIdAsync(lineItem.id);
    }
  },
  Mutation: {
    createLineItem: async (obj: any, lineItem: ILineItem) => {
      return await BudgetService.createLineItemAsync(lineItem);
    }
  }
};
