import { useEffect, useRef } from "react";
import { useSocketContext } from "@/context/SocketContext";

export const useBlockLock = (blockId: string) => {
  const { lockBlock, unlockBlock } = useSocketContext();
  const timeout = useRef<number>(0);

  const lock = () => {
    clearTimeout(timeout.current);
    lockBlock(blockId);
  };

  const unlock = () => {
    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => unlockBlock(blockId), 150);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
      unlockBlock(blockId);
    };
  }, []);

  return { lock, unlock };
};
