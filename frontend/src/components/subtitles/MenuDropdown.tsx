import React, { JSX } from "react";
import {
  CornerRightUp,
  CornerRightDown,
  Trash2,
  MoreVertical,
} from "lucide-react";

export type SubtitleMenuActionKey = "insertBefore" | "insertBelow" | "remove";

export interface MenuAction {
  key: SubtitleMenuActionKey;
  onClick: () => void;
  labelOverride?: string;
  danger?: boolean;
}

interface MenuDropdownProps {
  actions: MenuAction[];
}

const ICON_MAP: Record<SubtitleMenuActionKey, JSX.Element> = {
  insertBefore: <CornerRightUp size={16} />,
  insertBelow: <CornerRightDown size={16} />,
  remove: <Trash2 size={16} />,
};

const LABEL_MAP: Record<SubtitleMenuActionKey, string> = {
  insertBefore: "Insert Before",
  insertBelow: "Insert Below",
  remove: "Remove",
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({ actions }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-xs" aria-label="Options">
        <MoreVertical size={16} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
      >
        {actions.map((action, idx) => (
          <li key={idx}>
            <button
              onClick={action.onClick}
              className={`flex items-center gap-1 ${
                action.danger ? "text-red-500" : ""
              }`}
            >
              {ICON_MAP[action.key]}
              {action.labelOverride || LABEL_MAP[action.key]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDropdown;
