import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create an HTTP server using Express (required for Socket.io)
const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Object to map user IDs to their socket IDs (e.g., { "user123": "socketABC" })
const userSocketMap = {};

// Helper function to get a user's socket ID by their user ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // Returns socket ID if receiver exists, else undefined
};

// Listen for new socket connections
io.on("connection", (socket) => {
  console.log("a user connected :", socket.id);

  // Extract userId from the handshake query (sent during connection)
  const userId = socket.handshake.query.userId;

  // If userId exists, map it to the socket ID
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users to ALL connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for disconnection events
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete userSocketMap[userId]; // Remove user from the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update online users list
  });
});

export { app, io, server };