import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

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

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
  locks: Record<string, { id: string; fullName: string; socketId: string }>;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocketContext = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

interface SocketContextProviderProps {
  children: ReactNode;
  docId: string;
}

const SocketContextProvider = ({
  children,
  docId,
}: SocketContextProviderProps) => {
  const { authUser, isLoading } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [locks, setLocks] = useState<ISocketContext["locks"]>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isLoading && authUser && docId) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
          username: authUser.username,
          profilePic: authUser.profilePic,
          docId,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });

      socket.on("currentLocks", (current: Record<string, any>) => {
        setLocks(current);
      });
      socket.on("blockLocked", ({ blockId, user }: LockInfo) => {
        setLocks((l) => ({ ...l, [blockId]: user }));
      });
      socket.on("blockUnlocked", ({ blockId }: { blockId: string }) => {
        setLocks((l) => {
          const next = { ...l };
          delete next[blockId];
          return next;
        });
      });

      socket.emit("joinDoc", docId);

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }

    if (!authUser && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, [authUser, isLoading, docId]);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, onlineUsers, locks }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
