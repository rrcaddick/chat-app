import io from "socket.io-client";

let socket;

const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000");
  }
};

export { connectSocket, socket };
