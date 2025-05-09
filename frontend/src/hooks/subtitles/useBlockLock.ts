import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import { useAuthContext } from "@/context/AuthContext";

export const useBlockLock = (docId: string, blockId: string) => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const lock = () => {
    if (!socket || !authUser) return;
    socket.emit("lockBlock", {
      docId,
      blockId,
      user: {
        id: authUser.id,
        fullName: authUser.fullName,
        socketId: socket.id,
      },
    });
  };

  const unlock = () => {
    if (!socket) return;
    socket.emit("unlockBlock", { docId, blockId });
  };

  useEffect(() => {
    return () => {
      unlock();
    };
  }, []);

  return { lock, unlock };
};
