import express from "express";
import { catchErrors } from "./helpers/error-handlers";
import StocksController from "./controllers/stocks-controller";

export const register = (app: express.Application) => {
  // Stocks
  app.get("/quotes", catchErrors(StocksController.getQuotesAsync));
};
