import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  // Replace with your backend URL if available
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;
