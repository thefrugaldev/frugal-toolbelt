const express = require("express"),
  router = express.Router(),
  cardsController = require("./controllers/cards.controller");

module.exports = router;

//TODO: Implement handler for errors

//Credit Cards
router.get("/cards", cardsController.getAllCardsAsync);
router.get("/cards/:id", cardsController.getCardByIdAsync);
router.post("/cards", cardsController.createCardAsync);
