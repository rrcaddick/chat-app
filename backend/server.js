const path = require("path");
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

app.use("/profile-pictures", express.static(path.join(__dirname, "assets", "images", "profile-pictures")));

app.use("/api/chats", require("./routes/chat.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

// Not found
app.use(require("./middleware/notFound"));

// Error handler
app.use(require("./middleware/errorMiddleware"));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`.black.bgYellow);
});
