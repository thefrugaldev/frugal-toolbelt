import Card from "../interfaces/Card";
import CardChurningService from "../adapters/card-churning-service";

export const resolvers = {
  Query: {
    card: async (root: any, args: { id: string }) => {
      return await CardChurningService.fetchCardByIdAsync(args.id);
    },
    cards: async () => {
      return await CardChurningService.fetchAllCardsAsync();
    }
  },
  Mutation: {
    createCard: async (root: any, args: { card: Card }) => {
      return await CardChurningService.createCardAsync(args.card);
    }
  }
};
