const mongoose = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      console.log(`Connected to Mongo on host: ${connection.connection.host}`.black.bgGreen);
    });
};

module.exports = connectDb;
