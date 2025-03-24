import ContributorList from "./ContributorList";

interface SubtitleDocProps {
  id: string;
  name: string;
  createdBy: string;
  contributors: string[];
}

const SubtitleDocCard = ({
  name,
  createdBy,
  contributors,
}: SubtitleDocProps) => {
  return (
    <div className="bg-base-100 shadow-md rounded-lg w-full h-full p-4 flex flex-col justify-between">
      <h3 className="text-sm font-semibold text-center">{name}</h3>
      <p className="text-xs text-gray-500 text-center">
        Created by {createdBy}
      </p>
      <ContributorList contributors={contributors} />
    </div>
  );
};

export default SubtitleDocCard;
