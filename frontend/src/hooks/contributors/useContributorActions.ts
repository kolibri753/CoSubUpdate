import { useState, useCallback } from "react";
import { useRemoveAccess } from "../../hooks/hooks";

export const useContributorActions = (docId: string) => {
  const { removeAccess } = useRemoveAccess();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleRemove = useCallback(
    async (userId: string) => {
      setLoadingUserId(userId);
      try {
        await removeAccess(docId, userId);
      } catch (error) {
        console.error("Failed to remove access:", error);
      } finally {
        setLoadingUserId(null);
      }
    },
    [removeAccess, docId]
  );

  return { handleRemove, loadingUserId };
};
