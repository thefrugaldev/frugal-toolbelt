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
  }
};
