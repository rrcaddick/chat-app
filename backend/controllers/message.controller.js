const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const addMessage = asyncHandler(async (req, res, next) => {
  const {
    user,
    body: { chatId, content },
  } = req;

  const message = await Message.create({ sender: user._id, content, chat: chatId });

  const latestMessage = await (
    await message.populate("sender", "name profilePicture")
  ).populate({
    path: "chat",
    select: "chatName isGroupChat users",
    model: "Chat",
    populate: { path: "users", select: "name email profilePicture", model: "User" },
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage });

  res.status(200).json({ latestMessage });
});

const getMessages = asyncHandler(async (req, res, next) => {
  const {
    user,
    params: { chatId },
  } = req;

  const messages = await Message.find({ chat: chatId })
    .select("sender content chat createdAt")
    .populate("sender", "name email profilePicture")
    .populate("chat", "chatName isGroupChat users");

  res.status(200).json({ messages });
});

module.exports = {
  addMessage,
  getMessages,
};
