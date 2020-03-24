const express = require("express"),
  router = express.Router(),
  cardsController = require("./controllers/cards.controller"),
  { catchErrors } = require("./helpers/error-handlers");

//TODO: Implement handler for errors

//Credit Cards
router.get("/cards", catchErrors(cardsController.getAllCardsAsync));
router.get("/cards/:id", catchErrors(cardsController.getCardByIdAsync));
router.post("/cards", catchErrors(cardsController.createCardAsync));

module.exports = router;
