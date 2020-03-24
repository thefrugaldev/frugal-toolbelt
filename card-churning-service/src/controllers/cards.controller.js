const mongoose = require("mongoose");
const Card = mongoose.model("Card");

// POST
const createCardAsync = async (req, res) => {
  const card = new Card(req.body);

  await card.save();

  res.send(card);
};

// GET
const getAllCardsAsync = async (req, res) => {
  await Card.find({}, (err, cards) => {
    if (err) {
      res.status(404, "Events not found!");
    }

    res.send(cards);
  });
};

const getCardByIdAsync = async (req, res) => {
  const card = await Card.findById(req.params.id);

  res.send(card);
};

module.exports = {
  createCardAsync,
  getAllCardsAsync,
  getCardByIdAsync
};
