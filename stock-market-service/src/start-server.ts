import dotenv from "dotenv";
import app from "./app";

const port = process.env.PORT || 8082;

dotenv.config();

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`🏃 👟 🏃 👟 🏃 👟 🏃 → Stock market service running on ${port}`);
});
