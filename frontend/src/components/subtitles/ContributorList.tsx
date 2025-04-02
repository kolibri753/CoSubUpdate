import { UserIcon } from "lucide-react";

const ContributorList = ({ contributors }: { contributors: string[] }) => (
  <div className="flex flex-wrap justify-center gap-1">
    {contributors.length > 0 ? (
      contributors.map((username, index) => (
        <span
          key={index}
          className="badge badge-outline text-xs flex items-center gap-1"
        >
          <UserIcon className="size-3" />
          {username}
        </span>
      ))
    ) : (
      <p className="text-xs text-gray-400 text-center">No contributors</p>
    )}
  </div>
);

export default ContributorList;
