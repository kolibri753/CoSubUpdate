import React, { useState } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { useBlockLock } from "@/hooks/hooks";
import { useSocketContext } from "@/context/SocketContext";
import { useAuthContext } from "@/context/AuthContext";
import TimeInput from "./TimeInput";
import MenuDropdown, { MenuAction } from "./MenuDropdown";
import { SubtitleBlock as BlockType } from "@/store/useSubtitleBlocksStore";

interface SubtitleBlockProps {
  block: BlockType;
  index: number;
  onUpdate: (id: string, data: Partial<BlockType>) => void;
  onInsertBefore: (id: string) => void;
  onInsertAfter: (id: string) => void;
  onRemove: (id: string) => void;
}

const SubtitleBlock: React.FC<SubtitleBlockProps> = ({
  block,
  index,
  onUpdate,
  onInsertBefore,
  onInsertAfter,
  onRemove,
}) => {
  const { lock, unlock } = useBlockLock(block.docId, block.id);

  const { locks } = useSocketContext();
  const { authUser } = useAuthContext();

  const [content, setContent] = useState(block.text);
  const [start, setStart] = useState<number>(block.startTime);
  const [end, setEnd] = useState<number>(block.endTime);

  const locker = locks[block.id];
  const isLockedByOther = Boolean(locker && locker.id !== authUser?.id);

  const handleBlur = () => {
    if (start >= end) {
      toast.error("Start time must be less than end time");
      return;
    }
    if (isLockedByOther) {
      toast.error("This block is locked by another user.");
      return;
    }
    onUpdate(block.id, { text: content, startTime: start, endTime: end });
  };

  const actions: MenuAction[] = [
    { key: "insertBefore", onClick: () => onInsertBefore(block.id) },
    { key: "insertBelow", onClick: () => onInsertAfter(block.id) },
    { key: "remove", onClick: () => onRemove(block.id), danger: true },
  ];

  return (
    <div
      className="grid gap-2 border-b py-1
                 grid-cols-[min-content_1fr_min-content] lg:grid-cols-[min-content_14rem_1fr_auto]
                 grid-rows-[auto_auto] items-center"
      onFocusCapture={lock}
      onBlurCapture={unlock}
    >
      <span className="text-center text-sm font-bold w-6 lg:w-8">
        {index + 1}
      </span>
      <div className="flex gap-1 flex-shrink-0">
        <TimeInput
          value={start}
          onChange={setStart}
          onBlur={handleBlur}
          disabled={isLockedByOther}
        />
        <TimeInput
          value={end}
          onChange={setEnd}
          onBlur={handleBlur}
          disabled={isLockedByOther}
        />
      </div>
      <div className="lg:order-4 order-3 flex justify-end items-center gap-2">
        <MenuDropdown actions={actions} disabled={isLockedByOther} />
        {isLockedByOther && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Lock size={14} />
            {locker.fullName}
          </div>
        )}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        rows={1}
        disabled={isLockedByOther}
        className="lg:order-3 order-4 col-span-full lg:col-auto input input-bordered text-sm w-full min-h-10 resize-y focus:border-primary focus:outline-none p-2"
      />
    </div>
  );
};

export default SubtitleBlock;
