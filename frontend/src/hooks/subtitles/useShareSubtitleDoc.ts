import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { AccessType } from "../../store/useSubtitleDocStore";

export const useShareSubtitleDoc = () => {
  const shareSubtitleDoc = useCallback(
    async (id: string, userId: string, accessType: AccessType) => {
      try {
        const response = await fetch(`/api/subtitles/${id}/access`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, accessType }),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);
        } else {
          toast.error(result.error || "Failed to share document.");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    []
  );

  return { shareSubtitleDoc };
};
