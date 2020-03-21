require("dotenv").config();
require("../db");

const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080;

app.use(require("./routes.js"));

app.listen(port, () => {
  console.log(`Card churning service listening on port ${port}`);
});
