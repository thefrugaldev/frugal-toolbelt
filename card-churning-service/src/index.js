require("dotenv").config();
const bodyParser = require("body-parser");
import "../db/db";

import express from "express";
const app = express(),
  port = process.env.PORT || 8080;

//TODO: do we need cookie-parser, or cors libraries

app.use(bodyParser.json());

app.use(require("./routes.js"));

app.listen(port, () => {
  console.log(`Card churning service listening on port ${port}`);
});
