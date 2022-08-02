import { connectSocket, socket } from "../Services/Socket/connectSocket";
import { addReceivedMessage } from "../features/messageSlice";

const chatMiddleware = (store) => {
  return (next) => (action) => {
    if (!socket) connectSocket();
    if (action.type === "CHAT_SOCKET") {
      socket.on("messageReceived", (newMessage) => {
        const { selectedChat } = store.getState().chat;
        if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
          // Display notification
          return;
        }
        store.dispatch(addReceivedMessage(newMessage));
      });
    }

    if (action.type === "auth/loginUser/fulfilled") {
      socket.emit("connect_user", action.payload);
    }

    if (action.type === "chat/setSelectedChat") {
      socket.emit("joinChat", action.payload._id);
    }

    if (action.type === "message/addMessage/fulfilled") {
      const { latestMessage } = action.payload;
      socket.emit("newMessage", latestMessage);
    }

    next(action);
  };
};

export default chatMiddleware;
