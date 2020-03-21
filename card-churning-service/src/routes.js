const express = require("express"),
  router = express.Router(),
  cardsController = require("./controllers/cards.controller");

module.exports = router;

//Credit Cards
router.get("/cards", cardsController.getAllCards);
