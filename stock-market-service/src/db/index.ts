import mongoose from "mongoose";

export const initialize = () => {
  const { MONGO_DB_URI } = process.env;
  const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
  };

  mongoose
    .connect(MONGO_DB_URI, options)
    .then(() => {
      // tslint:disable-next-line:no-console
      console.log("👌 ✅ 👌 ✅ 👌 ✅ 👌 ✅ → MongoDB is connected");
    })
    .catch((err) => {
      // tslint:disable-next-line:no-console
      console.log(
        `🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → MongoDB could not connect: ${err}`
      );
    });
};
