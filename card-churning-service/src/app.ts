import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import * as routes from "./routes";
import * as db from "./db";
import * as errorHandlers from "./helpers/error-handlers";

const app = express();
const isDevelopment = app.get("env") === "development";

if (isDevelopment) {
  // tslint:disable-next-line:no-console
  console.log(
    `😨 🚧 😨 🚧 😨 🚧 😨 🚧 Working in development environment, proceed with caution `
  );

  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
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
    }
  );
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config();
db.initialize();

// TODO: Use api prefix?
// app.use("/api", routes);
routes.register(app);

app.use(errorHandlers.notFoundErrors);
app.use(errorHandlers.flashValidationErrors);

if (isDevelopment) app.use(errorHandlers.developmentErrors);

app.use(errorHandlers.productionErrors);

export default app;
