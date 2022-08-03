import { connectSocket, socket } from "../Services/Socket/connectSocket";
import { addReceivedMessage, toggleChatIsTyping, setTypingUser } from "../features/messageSlice";

const chatMiddleware = (store) => {
  return (next) => (action) => {
    if (!socket) connectSocket();
    switch (action.type) {
      case "CHAT_SOCKET_CONNECT": {
        socket.on("messageReceived", (newMessage) => {
          // const { selectedChat } = store.getState().chat;
          // if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
          //   // Display notification
          //   return;
          // }
          store.dispatch(addReceivedMessage(newMessage));
        });
        socket.on("typing", (user) => {
          store.dispatch(toggleChatIsTyping());
          store.dispatch(setTypingUser(user));
        });
        socket.on("stopTyping", () => {
          store.dispatch(toggleChatIsTyping());
        });
        break;
      }
      case "CHAT_SOCKET_DISCONNECT": {
        const { user } = store.getState().auth;
        socket.emit("disconnect", user);
        socket.disconnect();
        break;
      }
      case "auth/loginUser/fulfilled": {
        socket.emit("connect_user", action.payload);
        break;
      }
      case "chat/setSelectedChat": {
        socket.emit("joinChat", action.payload._id);
        break;
      }
      case "message/addMessage/fulfilled": {
        const { latestMessage } = action.payload;
        socket.emit("newMessage", latestMessage);
        break;
      }
      case "message/toggleUserIsTyping": {
        const { selectedChat } = store.getState().chat;
        const { user } = store.getState().auth;
        action.payload
          ? socket.emit("typing", { chat: selectedChat._id, user })
          : socket.emit("stopTyping", selectedChat._id);
        break;
      }

      default:
        break;
    }

    next(action);
  };
};

export default chatMiddleware;
