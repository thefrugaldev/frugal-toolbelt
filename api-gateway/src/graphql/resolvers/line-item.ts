import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import LineItem from "../interfaces/LineItem";
import LineItemService from "../adapters/line-item-service";

export const resolvers = {
  Query: {
    lineItems: async () => {
      return await LineItemService.fetchLineItemsAsync();
    },
    lineItem: async (root: any, args: { id: string }) => {
      return await LineItemService.fetchLineItemByIdAsync(args.id);
    }
  },
  Mutation: {
    createLineItem: async (root: any, args: { lineItem: LineItem }) => {
      // tslint:disable-next-line:no-console
      console.log("Line Item: ", args.lineItem);

      return await LineItemService.createLineItemAsync(args.lineItem);
    }
  },
  Date: new GraphQLScalarType({
    //TODO: Fix date property from nulling out
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
