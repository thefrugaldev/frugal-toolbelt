import { gql } from "apollo-server";
import ICategory from "../interfaces/ICategory";
import CategoryService from "../adapters/category-service";

export const typeDef = gql`
  type Category {
    _id: ID!
    name: String!
    icon: String!
    isActive: Boolean
  }

  extend type Mutation {
    createCategory(name: String!): Category!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }
`;

export const resolvers = {
  Query: {
    categories: async () => {
      return await CategoryService.fetchCategoriesAsync();
    },
    // TODO: Create route in api
    category: async (obj: any, category: ICategory) => {
      return await CategoryService.fetchCategoryByIdAsync(category.id);
    }
  },
  Mutation: {
    createCategory: async (obj: any, category: ICategory) => {
      return await CategoryService.createCategoryAsync(category);
    }
  }
};
