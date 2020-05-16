import LineItem from "../interfaces/LineItem";
import LineItemService from "../adapters/line-item-service";
import ApolloContext from "../interfaces/ApolloContext";

export const resolvers = {
  Query: {
    lineItems: async () => {
      return await LineItemService.fetchLineItemsAsync();
    },
    lineItem: async (root: any, args: { id: string }) => {
      return await LineItemService.fetchLineItemByIdAsync(args.id);
    },
    filterLineItemsByDate: async (
      root: any,
      args: { day: string; month: string; year: string },
      ctx: ApolloContext
    ) => {
      return await LineItemService.fetchLineItemsAsync(args);
    },
  },
  Mutation: {
    upsertLineItem: async (root: any, args: { lineItem: LineItem }) => {
      return args.lineItem._id
        ? await LineItemService.updateLineItemAsync(args.lineItem)
        : await LineItemService.createLineItemAsync(args.lineItem);
    },
    deleteLineItem: async (root: any, args: { id: string }) => {
      const result = await LineItemService.deleteLineItemAsync(args.id);
      return result === 204;
    },
  },
};
