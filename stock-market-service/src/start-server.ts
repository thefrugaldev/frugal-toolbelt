import app from "./app";

const port = process.env.PORT || 8082;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`🏃 👟 🏃 👟 🏃 👟 🏃 → Stock market service running on ${port}`);
});
