require("dotenv").config();
const colors = require("colors");
const connectDb = require("./config/connectDb");
const express = require("express");
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.listen(port, () => {
  console.log(`Server started on port: ${port}`.black.bgYellow);
});
