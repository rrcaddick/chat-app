const { RouteHandler } = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");

const getChats = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find();

  res.status(200).json({
    chats,
  });
});

const addChat = asyncHandler(async (req, res, next) => {
  const {
    body: { chatName, chatType, users },
  } = req;

  const chat = await Chat.create({ chatName, chatType, users });

  res.status(200).json({
    chat,
  });
});

const getChat = asyncHandler(async (req, res, next) => {
  const { chatId } = req.query;
  const chat = await Chat.findById(chatId);

  res.status(200).json({
    chat,
  });
});

const updateChat = asyncHandler(async (req, res, next) => {
  const {
    query: { chatId },
    body: { chatName, chatType, users },
  } = req;

  const chat = await Chat.findByIdAndUpdate(chatId, { chatName, chatType, users }, { new: true });

  res.status(200).json({
    chat,
  });
});

const deleteChat = asyncHandler(async (req, res, next) => {
  const { chatId } = req.query;

  await Chat.findByIdAndDelete(chatId);

  res.status(200).json({
    chatId,
  });
});

module.exports = {
  getChats,
  getChat,
  addChat,
  updateChat,
  deleteChat,
};
