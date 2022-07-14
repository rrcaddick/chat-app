require("dotenv").config();
const colors = require("colors");
const connectDb = require("./config/connectDb");
const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/chats", require("./routes/chat.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// Error handler
app.use(require("./middleware/errorMiddleware"));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`.black.bgYellow);
});
