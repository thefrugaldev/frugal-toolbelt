import express from "express";
import * as tradierClient from "../tradier/tradier-client";

// GET
const getQuotesAsync = async (req: express.Request, res: express.Response) => {
  const quotes = await tradierClient.getQuotesAsync(["AAPL", "TSLA"]);

  res.send(quotes);
};

export default { getQuotesAsync };
