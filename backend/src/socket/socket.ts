import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

interface UserSocketInfo {
  socketId: string;
  username: string;
  profilePic: string;
}

const userSocketMap: { [userId: string]: UserSocketInfo } = {};

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId]?.socketId;
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  const username = socket.handshake.query.username as string;
  const profilePic = socket.handshake.query.profilePic as string;

  if (userId) {
    userSocketMap[userId] = { socketId: socket.id, username, profilePic };
  }

  io.emit(
    "getOnlineUsers",
    Object.entries(userSocketMap).map(([id, info]) => ({ id, ...info }))
  );

  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit(
      "getOnlineUsers",
      Object.entries(userSocketMap).map(([id, info]) => ({ id, ...info }))
    );
  });
});

export { app, io, server };
