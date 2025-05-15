import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import useSubtitleBlocksStore, {
  SubtitleBlock,
} from "@/store/useSubtitleBlocksStore";

export interface OnlineUser {
  id: string;
  socketId: string;
  username: string;
  profilePic: string;
}

export interface LockInfo {
  blockId: string;
  user: { id: string; fullName: string; socketId: string };
}

interface SocketContextValue {
  onlineUsers: OnlineUser[];
  locks: Record<string, LockInfo["user"]>;
  lockBlock: (blockId: string) => void;
  unlockBlock: (blockId: string) => void;
  updateBlock: (
    blockId: string,
    data: Partial<Pick<SubtitleBlock, "text" | "startTime" | "endTime">>
  ) => void;
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const useSocketContext = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocketContext must be inside a SocketProvider");
  return ctx;
};

const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

interface SocketProviderProps {
  docId: string;
  children: React.ReactNode;
}

export default function SocketProvider({
  docId,
  children,
}: SocketProviderProps) {
  const { authUser, isLoading } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [locks, setLocks] = useState<SocketContextValue["locks"]>({});
  const socketRef = useRef<Socket | null>(null);

  const storeUpdateBlock = useSubtitleBlocksStore((s) => s.updateBlock);

  useEffect(() => {
    if (!isLoading && authUser && docId) {
      const socket = io(SOCKET_URL, {
        query: {
          docId,
          userId: authUser.id,
          username: authUser.username,
          profilePic: authUser.profilePic,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", setOnlineUsers);
      socket.on("currentLocks", (cur) => setLocks(cur));
      socket.on("blockLocked", ({ blockId, user }) => {
        console.log("client received blockLocked →", blockId, user);
        setLocks((l) => ({ ...l, [blockId]: user }));
      });
      socket.on("blockUnlocked", ({ blockId }) => {
        console.log("client received blockUnlocked →", blockId);
        setLocks((l) => {
          const next = { ...l };
          delete next[blockId];
          return next;
        });
      });
      socket.on("blockChanged", (updated: SubtitleBlock) => {
        storeUpdateBlock(updated);
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [authUser, isLoading, docId, storeUpdateBlock]);

  const lockBlock = (blockId: string) =>
    socketRef.current?.emit("lockBlock", { blockId });

  const unlockBlock = (blockId: string) =>
    socketRef.current?.emit("unlockBlock", { blockId });

  const updateBlock = (
    blockId: string,
    data: Partial<Pick<SubtitleBlock, "text" | "startTime" | "endTime">>
  ) => {
    storeUpdateBlock({ id: blockId, ...data } as SubtitleBlock);

    socketRef.current?.emit(
      "blockChanged",
      { blockId, data },
      (ack: { success: boolean; error?: string }) => {
        if (!ack.success) console.error("Save failed:", ack.error);
      }
    );
  };

  return (
    <SocketContext.Provider
      value={{ onlineUsers, locks, lockBlock, unlockBlock, updateBlock }}
    >
      {children}
    </SocketContext.Provider>
  );
}
