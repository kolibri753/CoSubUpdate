import { useEffect, useRef } from "react";
import { useSocketContext } from "@/context/SocketContext";
import { useAuthContext } from "@/context/AuthContext";

export const useBlockLock = (docId: string, blockId: string) => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const unlockTimeout = useRef<number | null>(null);

  const lock = () => {
    if (unlockTimeout.current) {
      clearTimeout(unlockTimeout.current);
      unlockTimeout.current = null;
    }
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

    if (unlockTimeout.current) {
      clearTimeout(unlockTimeout.current);
    }

    unlockTimeout.current = window.setTimeout(() => {
      socket.emit("unlockBlock", { docId, blockId });
      unlockTimeout.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (unlockTimeout.current) {
        clearTimeout(unlockTimeout.current);
        unlockTimeout.current = null;
      }

      if (socket) {
        socket.emit("unlockBlock", { docId, blockId });
      }
    };
  }, []);

  return { lock, unlock };
};
