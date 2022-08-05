import io from "socket.io-client";

let socket;

const host = process.env.NODE_ENV === "development" ? "http://localhost:5000" : undefined;

const connectSocket = () => {
  if (!socket) {
    socket = io(host);
  }
};

export { connectSocket, socket };
