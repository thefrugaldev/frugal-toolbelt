const CreditCard = require("../models/CreditCard");

module.exports = {
  getAllCardsAsync: async (req, res) => {
    const cards = await CreditCard.find();

    res.send(cards);
  }
};
