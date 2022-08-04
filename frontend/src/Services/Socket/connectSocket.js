import io from "socket.io-client";

let socket;

const connectSocket = () => {
  if (!socket) {
    socket = io();
  }
};

export { connectSocket, socket };
