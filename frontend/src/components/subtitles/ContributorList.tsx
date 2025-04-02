import { useState, useMemo } from "react";
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

  const handleRemove = async (userId: string) => {
    setLoadingUserId(userId);
    try {
      await removeAccess(docId, userId);
    } catch (error) {
      console.error("Failed to remove access:", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const renderedContributors = useMemo(
    () =>
      access.map(({ userId, username, accessType }) => (
        <div
          key={userId}
          className={clsx(
            "flex items-center text-white px-3 py-1 rounded-md shadow-md",
            accessColors[accessType] || "bg-gray-500"
          )}
        >
          {username}
          <button onClick={() => handleRemove(userId)} className="ml-2">
            {loadingUserId === userId ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <X size={16} className="hover:text-red-300" />
            )}
          </button>
        </div>
      )),
    [access, loadingUserId]
  );

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {renderedContributors.length ? (
        renderedContributors
      ) : (
        <p className="text-gray-500">No access granted</p>
      )}
    </div>
  );
};

export default ContributorList;
