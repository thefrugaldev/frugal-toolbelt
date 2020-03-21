const mongoose = require("mongoose");
const { MONGO_DB_URI } = process.env;
const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000
};

mongoose
  .connect(MONGO_DB_URI, options)
  .then(function() {
    console.log("👌 ✅ 👌 ✅ 👌 ✅ 👌 ✅ MongoDB is connected");
  })
  .catch(function(err) {
    console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 MongoDB could not connect: ${err}`);
  });

mongoose.Promise = global.Promise;

// Import models
require("./src/models/Card");
