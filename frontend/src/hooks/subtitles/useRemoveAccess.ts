import { useCallback } from "react";
import { toast } from "react-hot-toast";
import useSubtitleDocStore from "../../store/useSubtitleDocStore";

export const useRemoveAccess = () => {
  const { updateAccess, docs } = useSubtitleDocStore();

  const removeAccess = useCallback(
    async (docId: string, userId: string) => {
      try {
        const response = await fetch(`/api/subtitles/${docId}/access`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to remove access");
        }

        const updatedDoc = docs.find((doc) => doc.id === docId);
        if (!updatedDoc) return;

        const newAccessList = updatedDoc.access.filter(
          (u) => u.userId !== userId
        );
        updateAccess(docId, newAccessList);

        toast.success(data.message);
      } catch (error: any) {
        toast.error(error.message || "Failed to remove user access.");
      }
    },
    [updateAccess, docs]
  );

  return { removeAccess };
};
