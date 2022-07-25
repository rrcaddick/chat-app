const { RouteHandler } = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");

const getChats = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const chats = await Chat.find({ users: user }).populate("users").exec();

  const updatedChats = chats.map((chat) => {
    if (chat.isGroupChat) return chat;
    return {
      ...chat._doc,
      chatName: chat.users.find((u) => u._id.toString() !== user._id.toString()).name,
    };
  });

  res.status(200).json({
    chats: updatedChats,
  });
});

const addEditChat = asyncHandler(async (req, res, next) => {
  const {
    user,
    body: { userId },
  } = req;

  let chat = await Chat.findOne({ isGroupChat: false, users: { $all: [user._id, userId] } })
    .populate("users", "-password -refreshToken")
    .populate("latestMessage");

  if (!chat) {
    chat = await Chat.create({ chatName: "sender", isGroupChat: false, users: [user._id, userId] });
    chat = await Chat.findById(chat._id).populate("users", "-password -refreshToken").populate("latestMessage");
  }

  const updatedChat = {
    ...chat._doc,
    chatName: chat.users.find((u) => u._id.toString() !== user._id.toString()).name,
  };

  res.status(200).json({
    chat: updatedChat,
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
  addEditChat,
  updateChat,
  deleteChat,
};
