import { useCallback } from "react";
import { toast } from "react-hot-toast";

export const useShareSubtitleDoc = () => {
  const shareSubtitleDoc = useCallback(
    async (id: string, userId: string, accessType: "view" | "edit") => {
      try {
        const response = await fetch(`/api/subtitles/${id}/${accessType}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success(
            accessType === "view"
              ? "Viewer added successfully!"
              : "Editor added successfully!"
          );
        } else {
          toast.error(result.error || "Failed to share document.");
        }
      } catch (error) {
        console.error("Sharing error:", error);
        toast.error("Failed to share document. Try again.");
      }
    },
    []
  );

  return { shareSubtitleDoc };
};
