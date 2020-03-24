require("dotenv").config();
import "../db/db";

import express from "express";
const app = express(),
  port = process.env.PORT || 8080;

app.use(require("./routes.js"));

//TODO: do we need cookie-parser, body-parser, or cors libraries

app.listen(port, () => {
  console.log(`Card churning service listening on port ${port}`);
});
