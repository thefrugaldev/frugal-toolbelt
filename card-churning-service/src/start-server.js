require("dotenv").config();
require("./db");

const app = require("./app");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🏃 👟 🏃 👟 🏃 👟 🏃 Card churning service running on ${port}`);
});
