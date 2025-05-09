import React, { JSX } from "react";
import clsx from "clsx";
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
  disabled?: boolean;
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

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  actions,
  disabled = false,
}) => (
  <div className="dropdown dropdown-end">
    <label
      tabIndex={0}
      className={clsx(
        "btn btn-ghost btn-xs",
        disabled && "opacity-50 pointer-events-none"
      )}
      aria-label="Options"
    >
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
            disabled={disabled}
            className={clsx(
              "flex items-center gap-1",
              action.danger && "text-red-500",
              disabled && "opacity-50 pointer-events-none"
            )}
          >
            {ICON_MAP[action.key]}
            {action.labelOverride || LABEL_MAP[action.key]}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default MenuDropdown;
