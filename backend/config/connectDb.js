const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      console.log(`MongoDB connected on host: ${connection.connection.host}`.black.bgGreen);
    })
    .catch((error) => {
      console.log(`MongoDB Error: ${error.message}`.black.bgRed);
      process.exit(1);
    });
};

module.exports = connectDb;
