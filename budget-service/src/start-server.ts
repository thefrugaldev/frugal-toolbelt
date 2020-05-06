import app from "./app";

const port = process.env.PORT || 8081;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`🏃 👟 🏃 👟 🏃 👟 🏃 → Budget service running on ${port}`);
});
