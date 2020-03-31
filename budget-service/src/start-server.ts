import dotenv from "dotenv";
import { app } from "./app";
import * as db from "./db";

dotenv.config();

const port = process.env.PORT || 8081;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`🏃 👟 🏃 👟 🏃 👟 🏃 → Budget service running on ${port}`);
});
