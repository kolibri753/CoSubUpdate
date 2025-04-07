import { useCallback } from "react";
import { toast } from "react-hot-toast";
import useSubtitleDocStore, {
  SubtitleAccess,
  AccessType,
} from "../../store/useSubtitleDocStore";

export const useRemoveAccess = () => {
  const { updateAccess, docs } = useSubtitleDocStore();

  const removeAccess = useCallback(
    async (docId: string, userId: string) => {
      const doc = docs.find((doc) => doc.id === docId);
      if (!doc) return;

      const user = doc.access.find((u) => u.userId === userId);
      if (!user) return;

      const isDowngrade = user.accessType === "EDIT";
      try {
        const response = await fetch(`/api/subtitles/${docId}/access`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to update access");
        }

        toast.success(data.message);

        const updatedAccessList: SubtitleAccess[] = isDowngrade
          ? doc.access.map((u) =>
              u.userId === userId
                ? { ...u, accessType: "VIEW" as AccessType }
                : u
            )
          : doc.access.filter((u) => u.userId !== userId);

        updateAccess(docId, updatedAccessList);
      } catch (error: any) {
        toast.error(error.message || "Failed to update access.");
      }
    },
    [updateAccess, docs]
  );

  return { removeAccess };
};
