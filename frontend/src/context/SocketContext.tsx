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
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
          username: authUser.username,
          profilePic: authUser.profilePic,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!authUser && !isLoading && socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
