import { X, Loader2 } from "lucide-react";
import clsx from "clsx";
import { ACCESS_COLORS } from "../../../constants/accessColors";

interface ContributorItemProps {
  userId: string;
  username: string;
  accessType: string;
  loadingUserId: string | null;
  onRemove: (userId: string) => void;
}

const ContributorItem = ({
  userId,
  username,
  accessType,
  loadingUserId,
  onRemove,
}: ContributorItemProps) => (
  <div
    key={userId}
    className={clsx(
      "group flex items-center text-white px-2 py-0.5 rounded-md shadow-md text-[14px]",
      ACCESS_COLORS[accessType] || "bg-gray-500",
      loadingUserId === userId && "opacity-50"
    )}
  >
    {username}
    <button
      onClick={() => onRemove(userId)}
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
);

export default ContributorItem;
