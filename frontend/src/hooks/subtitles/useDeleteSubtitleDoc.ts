import { useCallback } from "react";
import { toast } from "react-hot-toast";
import useSubtitleDocStore from "../../store/useSubtitleDocStore";

export const useDeleteSubtitleDoc = () => {
  const { deleteDoc } = useSubtitleDocStore();

  const deleteSubtitleDoc = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/subtitles/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
          deleteDoc(id);
        } else {
          toast.error(result.error || "Failed to delete subtitle.");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [deleteDoc]
  );

  return { deleteSubtitleDoc };
};
