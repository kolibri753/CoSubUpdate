import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { AccessType, SubtitleAccess } from "../../store/useSubtitleDocStore";
import useSubtitleDocStore from "../../store/useSubtitleDocStore";

export const useShareSubtitleDoc = () => {
  const updateAccess = useSubtitleDocStore((state) => state.updateAccess);

  const shareSubtitleDoc = useCallback(
    async (id: string, userId: string, accessType: AccessType) => {
      try {
        const response = await fetch(`/api/subtitles/${id}/access`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, accessType }),
        });

        const result = await response.json();
        if (!response.ok)
          throw new Error(result.error || "Failed to share document");

        toast.success(result.message);

        updateAccess(id, (prevAccess: SubtitleAccess[]) => {
          const userExists = prevAccess.some((u) => u.userId === userId);
          return userExists
            ? prevAccess.map((u) =>
                u.userId === userId ? { ...u, accessType } : u
              )
            : [
                ...prevAccess,
                { userId, username: result.username, accessType },
              ];
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [updateAccess]
  );

  return { shareSubtitleDoc };
};
