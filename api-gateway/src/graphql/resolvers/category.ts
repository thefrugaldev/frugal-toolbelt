import Category from "../interfaces/Category";
import CategoryService from "../adapters/category-service";

export const resolvers = {
  Query: {
    categories: async () => {
      return await CategoryService.fetchCategoriesAsync();
    },
    // TODO: Create route in api
    category: async (root: any, args: { id: string }) => {
      return await CategoryService.fetchCategoryByIdAsync(args.id);
    }
  },
  Mutation: {
    createCategory: async (root: any, args: { category: Category }) => {
      return await CategoryService.createCategoryAsync(args.category);
    }
  }
};
