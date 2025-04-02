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

        console.log("Removing access for:", { docId, userId });

        if (!response.ok) {
          throw new Error("Failed to remove access");
        }

        const updatedDoc = docs.find((doc) => doc.id === docId);
        if (!updatedDoc) return;

        const newAccessList = updatedDoc.access.filter(
          (u) => u.userId !== userId
        );
        updateAccess(docId, newAccessList);

        toast.success("User removed successfully.");
      } catch (error) {
        console.error("Remove access error:", error);
        toast.error("Failed to remove user access.");
      }
    },
    [updateAccess, docs]
  );

  return { removeAccess };
};
