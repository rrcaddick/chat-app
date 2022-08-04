const path = require("path");
require("dotenv").config();
const colors = require("colors");
const connectDb = require("./config/connectDb");
const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
const protect = require("./middleware/authMiddleware");

connectDb();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/profile-pictures", express.static(path.join(__dirname, "assets", "images", "profile-pictures")));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chats", protect, require("./routes/chat.routes"));
app.use("/api/users", protect, require("./routes/user.routes"));
app.use("/api/messages", protect, require("./routes/message.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
  });
}

// Not found
app.use(require("./middleware/notFound"));

// Error handler
app.use(require("./middleware/errorMiddleware"));

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`.black.bgYellow);
});

// Webscoket
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("connect_user", (user) => {
    socket.join(user._id);
    socket.emit("connected");
    console.log(`${user.name} Connected`);
  });

  socket.on("joinChat", (chat) => {
    socket.join(chat);
    console.log(`User Joined Room: ${chat}`);
    socket.emit("connected");
  });

  socket.on("newMessage", (newMessage) => {
    newMessage.chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return;
      console.log("dispatching message to " + user.name);
      socket.to(user._id).emit("messageReceived", newMessage);
    });
  });

  socket.on("typing", ({ chat, user }) => socket.in(chat).emit("typing", user));
  socket.on("stopTyping", (chat) => socket.in(chat).emit("stopTyping"));

  socket.on("disconnect_user", (user) => {
    socket.leave(user._id);
  });
});
