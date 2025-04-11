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

interface ISocketContext {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
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
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (authUser && !isLoading && docId) {
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
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
