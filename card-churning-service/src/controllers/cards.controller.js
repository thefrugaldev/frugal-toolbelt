const mongoose = require("mongoose");
const Card = mongoose.model("Card");

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
  getAllCardsAsync,
  getCardByIdAsync
};
