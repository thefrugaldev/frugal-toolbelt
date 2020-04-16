import LineItem from "../interfaces/LineItem";
import LineItemService from "../adapters/line-item-service";

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
      args: { day: string; month: string; year: string }
    ) => {
      return await LineItemService.fetchLineItemsAsync(args);
    },
  },
  Mutation: {
    createLineItem: async (root: any, args: { lineItem: LineItem }) => {
      return await LineItemService.createLineItemAsync(args.lineItem);
    },
    deleteLineItem: async (root: any, args: { id: string }) => {
      const result = await LineItemService.deleteLineItemAsync(args.id);
      return result === 204;
    },
  },
};
