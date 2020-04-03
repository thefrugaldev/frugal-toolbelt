import express from "express";
import { catchErrors } from "./helpers/error-handlers";
import LineItemController from "./controllers/line-items-controller";
import CategoryController from "./controllers/categories-controller";

export const register = (app: express.Application) => {
  // TODO: Add user authorization to controllers

  // Line Items
  app.get("/line-items", catchErrors(LineItemController.getLineItemsAsync));

  app.get(
    "/line-items/:id",
    catchErrors(LineItemController.getLineItemByIdAsync)
  );
  app.post("/line-items", catchErrors(LineItemController.createLineItemAsync));
  app.put(
    "/line-items/:id",
    catchErrors(LineItemController.updateLineItemAsync)
  );
  app.delete(
    "/line-items/:id",
    catchErrors(LineItemController.deleteLineItemAsync)
  );

  // Categories
  app.get("/categories", catchErrors(CategoryController.getCategoriesAsync));

  app.post("/categories", catchErrors(CategoryController.createCategoryAsync));

  app.delete(
    "/categories/:id",
    catchErrors(CategoryController.deleteCategoryAsync)
  );
};
