import { gql } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import ILineItem from "../interfaces/ILineItem";
import LineItemService from "../adapters/line-item-service";

export const typeDef = gql`
  scalar Date

  type LineItem {
    _id: ID!
    title: String!
    category: Category
    description: String!
    amount: String!
    isSavings: Boolean
    date: Date!
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
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};
