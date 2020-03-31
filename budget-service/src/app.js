const express = require("express"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  routes = require("./routes"),
  errorHandlers = require("./helpers/error-handlers");

const app = express();
const isDevelopment = app.get("env") === "development";

if (isDevelopment) {
  console.log(
    `😨 🚧 😨 🚧 😨 🚧 😨 🚧 Working in development environment, proceed with caution `
  );

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );

    next();
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//TODO: Use api prefix?
// app.use("/api", routes);
// app.use(routes);

app.use(errorHandlers.notFoundErrors);
app.use(errorHandlers.flashValidationErrors);

if (isDevelopment) app.use(errorHandlers.developmentErrors);

app.use(errorHandlers.productionErrors);

module.exports = app;
