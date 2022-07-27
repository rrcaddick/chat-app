const { RouteHandler } = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");

const getChats = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const chats = await Chat.find({ users: user }).populate("users", "-password -refreshToken");

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
    body: { _id, users, chatName, isGroupChat },
  } = req;

  let chat;

  if (!isGroupChat) {
    chat = await Chat.findOne({ isGroupChat, users: { $all: [user._id, users[0]] } })
      .populate("users", "-password -refreshToken")
      .populate("latestMessage");
  }

  if (_id) {
    chat = await Chat.findByIdAndUpdate(_id, { chatName, users: [user._id, ...users], isGroupChat }, { new: true })
      .populate("users", "-password -refreshToken")
      .populate("latestMessage");
  }

  if (!chat) {
    chat = await Chat.create({
      chatName,
      isGroupChat,
      users: [user._id, ...users],
      groupAdmin: isGroupChat ? user._id : undefined,
    });
    chat = await Chat.findById(chat._id).populate("users", "-password -refreshToken").populate("latestMessage");
  }

  const updatedChat = {
    ...chat._doc,
    chatName: isGroupChat ? chat.chatName : chat.users.find((u) => u._id.toString() !== user._id.toString()).name,
  };

  res.status(200).json({
    chat: updatedChat,
  });
});

const deleteLeaveChat = asyncHandler(async (req, res, next) => {
  const {
    user,
    params: { chatId },
    body: { users, isGroupChat },
  } = req;

  let chat;

  if (!isGroupChat || users.length === 0) {
    await Chat.findByIdAndDelete(chatId);
  } else {
    await Chat.findByIdAndUpdate(chatId, { users: [...users], groupAdmin: users[0] });
  }

  res.status(200).json({
    chatId,
  });
});

module.exports = {
  getChats,
  addEditChat,
  deleteLeaveChat,
};
