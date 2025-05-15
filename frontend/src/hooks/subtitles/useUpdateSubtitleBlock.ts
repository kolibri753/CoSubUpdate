import { useCallback } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "@/context/SocketContext";
import type { SubtitleBlock } from "@/store/useSubtitleBlocksStore";

export const useUpdateSubtitleBlock = () => {
  const { updateBlock } = useSocketContext();

  return useCallback(
    async (
      blockId: string,
      data: { text?: string; startTime?: number; endTime?: number }
    ): Promise<SubtitleBlock> => {
      updateBlock(blockId, data);
      const res = await fetch(`/api/subtitles/block/${blockId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Update failed");
        throw new Error(err.error || "Update failed");
      }

      const {
        message,
        updatedBlock,
      }: { message: string; updatedBlock: SubtitleBlock } = await res.json();

      toast.success(message);

      updateBlock(updatedBlock.id, {
        text: updatedBlock.text,
        startTime: updatedBlock.startTime,
        endTime: updatedBlock.endTime,
      });

      return updatedBlock;
    },
    [updateBlock]
  );
};
