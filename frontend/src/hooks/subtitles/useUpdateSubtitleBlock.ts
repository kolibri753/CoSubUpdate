import { useCallback } from "react";
import useSubtitleBlocksStore, {
  SubtitleBlock,
} from "../../store/useSubtitleBlocksStore";

export const useUpdateSubtitleBlock = () => {
  const { updateBlock } = useSubtitleBlocksStore();

  const updateSubtitleBlock = useCallback(
    async (
      blockId: string,
      data: { text?: string; startTime?: number; endTime?: number }
    ): Promise<SubtitleBlock> => {
      const res = await fetch(`/api/subtitles/block/${blockId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }
      const updatedBlock = await res.json();
      updateBlock(updatedBlock);
      return updatedBlock;
    },
    [updateBlock]
  );

  return updateSubtitleBlock;
};
