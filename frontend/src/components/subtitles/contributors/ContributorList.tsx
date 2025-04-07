import { SubtitleAccess } from "../../../store/useSubtitleDocStore";
import { useContributorActions } from "../../../hooks/hooks";
import ContributorItem from "./ContributorItem";

interface ContributorListProps {
  access: SubtitleAccess[];
  docId: string;
}

const ContributorList = ({ access, docId }: ContributorListProps) => {
  const { handleRemove, loadingUserId } = useContributorActions(docId);

  return (
    <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto my-2">
      {access.length ? (
        access.map(({ userId, username, accessType }) => (
          <ContributorItem
            key={userId}
            userId={userId}
            username={username}
            accessType={accessType}
            loadingUserId={loadingUserId}
            onRemove={handleRemove}
          />
        ))
      ) : (
        <p className="text-gray-500 text-xs">No access granted</p>
      )}
    </div>
  );
};

export default ContributorList;
