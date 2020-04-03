import express from "express";
import CardsController from "./controllers/cards-controller";
import { catchErrors } from "./helpers/error-handlers";

export const register = (app: express.Application) => {
  // Credit Cards
  app.get("/cards", catchErrors(CardsController.getAllCardsAsync));
  app.get("/cards/:id", catchErrors(CardsController.getCardByIdAsync));
  app.post("/cards", catchErrors(CardsController.createCardAsync));
};
