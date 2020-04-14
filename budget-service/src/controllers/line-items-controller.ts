import LineItem from "../models/LineItem";
import express from "express";

// GET
const getLineItemsAsync = async (
  req: express.Request,
  res: express.Response
) => {
  const query: any = {};

  // TODO: REFACTOR
  if (req.query) {
    for (const key in req.query) {
      if (req.query[key] !== "") query[key] = req.query[key];
    }
  }

  const lineItems = await LineItem.find(query).populate("category");

  res.send(lineItems);
};

const getLineItemByIdAsync = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const lineItem = await LineItem.findById(req.params.id).populate("category");

  if (!lineItem) return next();

  res.send(lineItem);
};

// POST
const createLineItemAsync = async (
  req: express.Request,
  res: express.Response
) => {
  const lineItem = new LineItem(req.body);

  await lineItem.save();

  res.send(lineItem);
};

// PUT
const updateLineItemAsync = async (
  req: express.Request,
  res: express.Response
) => {
  const lineItem = await LineItem.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true, // return the new budget instead of the old one
      runValidators: true,
    }
  ).exec();

  res.send(lineItem);
};

// DELETE
const deleteLineItemAsync = async (
  req: express.Request,
  res: express.Response
) => {
  await LineItem.findByIdAndDelete(req.params.id);

  res.sendStatus(204);
};

export default {
  getLineItemsAsync,
  getLineItemByIdAsync,
  createLineItemAsync,
  updateLineItemAsync,
  deleteLineItemAsync,
};
