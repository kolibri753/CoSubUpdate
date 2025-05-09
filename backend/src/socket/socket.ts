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

const locks: Record<
  string,
  Record<string, { id: string; fullName: string; socketId: string }>
> = {};

export const getReceiverSocketId = (
  docId: string,
  userId: string
): string | undefined => docUserMap[docId]?.[userId]?.socketId;

io.on("connection", (socket) => {
  const { userId, username, profilePic, docId } = socket.handshake
    .query as Record<string, string>;

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
    Object.entries(docUserMap[docId]).map(([id, info]) => ({ id, ...info }))
  );

  socket.emit("currentLocks", locks[docId] || {});

  socket.on("lockBlock", ({ blockId }: { blockId: string }) => {
    if (!locks[docId]) locks[docId] = {};
    locks[docId][blockId] = {
      id: userId,
      fullName: username,
      socketId: socket.id,
    };
    io.to(docId).emit("blockLocked", { blockId, user: locks[docId][blockId] });
  });

  socket.on("unlockBlock", ({ blockId }: { blockId: string }) => {
    if (locks[docId]?.[blockId]) {
      delete locks[docId][blockId];
      io.to(docId).emit("blockUnlocked", { blockId });
    }
  });

  socket.on("disconnect", () => {
    delete docUserMap[docId][userId];
    io.to(docId).emit(
      "getOnlineUsers",
      Object.entries(docUserMap[docId] || {}).map(([id, info]) => ({
        id,
        ...info,
      }))
    );

    const docLocks = locks[docId] || {};
    Object.keys(docLocks).forEach((blockId) => {
      if (docLocks[blockId].id === userId) {
        delete docLocks[blockId];
        io.to(docId).emit("blockUnlocked", { blockId });
      }
    });
    locks[docId] = docLocks;
  });
});

export { app, io, server };
