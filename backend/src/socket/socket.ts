import express from "express";
import http from "http";
import { Server } from "socket.io";

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

const docUserMap: Record<string, Record<string, UserSocketInfo>> = {};

export const getReceiverSocketId = (
  docId: string,
  userId: string
): string | undefined => docUserMap[docId]?.[userId]?.socketId;

io.on("connection", (socket) => {
  const {
    userId,
    username,
    profilePic,
    docId,
  } = socket.handshake.query as Record<string, string>;

  if (!userId || !docId) return;

  if (!docUserMap[docId]) {
    docUserMap[docId] = {};
  }

  docUserMap[docId][userId] = {
    socketId: socket.id,
    username,
    profilePic,
  };

  socket.join(docId);

  io.to(docId).emit(
    "getOnlineUsers",
    Object.entries(docUserMap[docId]).map(([id, info]) => ({
      id,
      ...info,
    }))
  );

  socket.on("disconnect", () => {
    delete docUserMap[docId][userId];
    io.to(docId).emit(
      "getOnlineUsers",
      Object.entries(docUserMap[docId] || {}).map(([id, info]) => ({
        id,
        ...info,
      }))
    );
  });
});

export { app, io, server };
