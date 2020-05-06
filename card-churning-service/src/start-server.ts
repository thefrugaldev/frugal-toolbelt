import app from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    `🏃 👟 🏃 👟 🏃 👟 🏃 → Card churning service running on ${port}`
  );
});
