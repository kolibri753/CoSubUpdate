import { useState, useMemo, useCallback } from "react";
import clsx from "clsx";
import { X, Loader2 } from "lucide-react";
import { useRemoveAccess } from "../../hooks/hooks";
import { SubtitleAccess } from "../../store/useSubtitleDocStore";

interface ContributorListProps {
  access: SubtitleAccess[];
  docId: string;
}

const accessColors: Record<string, string> = {
  VIEW: "bg-blue-500",
  EDIT: "bg-green-500",
};

const ContributorList = ({ access, docId }: ContributorListProps) => {
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

  const renderedContributors = useMemo(
    () =>
      access.map(({ userId, username, accessType }) => (
        <div
          key={userId}
          className={clsx(
            "group flex items-center text-white px-2 py-0.5 rounded-md shadow-md text-[14px]",
            accessColors[accessType] || "bg-gray-500",
            loadingUserId === userId && "opacity-50"
          )}
        >
          {username}
          <button
            onClick={() => handleRemove(userId)}
            className="ml-1"
            disabled={loadingUserId === userId}
          >
            {loadingUserId === userId ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <X size={16} className="hover:text-red-300" />
            )}
          </button>
        </div>
      )),
    [access, loadingUserId, handleRemove]
  );

  return (
    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
      {renderedContributors.length ? (
        renderedContributors
      ) : (
        <p className="text-gray-500 text-xs">No access granted</p>
      )}
    </div>
  );
};

export default ContributorList;
