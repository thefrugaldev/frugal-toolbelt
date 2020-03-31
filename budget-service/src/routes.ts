import express from "express";
import { catchErrors } from "./helpers/error-handlers";
import LineItemController from "./controllers/line-item-controller";
import CategoryController from "./controllers/category-controller";

export const register = (router: express.Application) => {
  // TODO: Add user authorization to controllers

  //   //   Budgets
  //   router.get("/line-items", catchErrors(LineItemController.getLineItemsAsync));

  //   router.get(
  //     "/line-items/:id",
  //     catchErrors(LineItemController.getLineItemByIdAsync)
  //   );
  //   router.post(
  //     "/line-items",
  //     catchErrors(LineItemController.createLineItemAsync)
  //   );
  //   router.put(
  //     "/line-items/:id",
  //     catchErrors(LineItemController.updateLineItemAsync)
  //   );
  //   router.delete(
  //     "/line-items/:id",
  //     catchErrors(LineItemController.deleteLineItemAsync)
  //   );

  // // Categories
  router.get("/categories", catchErrors(CategoryController.getCategoriesAsync));
  //   router.post(
  //     "/categories",
  //     catchErrors(CategoryController.createCategoryAsync)
  //   );
  //   router.delete(
  //     "/categories/:id",
  //     catchErrors(CategoryController.deleteCategoryAsync)
  //   );
};
