import express from "express";
import Card from "../models/Card";

// POST
const createCardAsync = async (req: express.Request, res: express.Response) => {
  const card = new Card(req.body);

  await card.save();

  res.send(card);
};

// GET
const getAllCardsAsync = async (
  req: express.Request,
  res: express.Response
) => {
  await Card.find({}, (err, cards) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.log(err);
      res.status(404);
    }

    res.send(cards);
  });
};

const getCardByIdAsync = async (
  req: express.Request,
  res: express.Response
) => {
  const card = await Card.findById(req.params.id);

  res.send(card);
};

export default { createCardAsync, getAllCardsAsync, getCardByIdAsync };
