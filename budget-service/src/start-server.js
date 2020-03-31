require("dotenv").config();
require("./db");

const app = require("./app");
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(
    `🏃 👟 🏃 👟 🏃 👟 🏃 → Card churning service running on ${port}`
  );
});
