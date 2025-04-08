import React, { useState } from "react";
import toast from "react-hot-toast";
import TimeInput from "./TimeInput";
import MenuDropdown, { MenuAction } from "./MenuDropdown";
import { SubtitleBlock as BlockType } from "../../store/useSubtitleBlocksStore";

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
  const [content, setContent] = useState(block.text);
  const [start, setStart] = useState<number>(Number(block.startTime));
  const [end, setEnd] = useState<number>(Number(block.endTime));

  const handleBlur = () => {
    if (start >= end) {
      toast.error("Start time must be less than end time");
      return;
    }
    // TODO: Consider debouncing updates.
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
    >
      <span className="text-center text-sm font-bold w-6 lg:w-8">
        {index + 1}
      </span>
      <div className="flex gap-1 flex-shrink-0">
        <TimeInput value={start} onChange={setStart} onBlur={handleBlur} />
        <TimeInput value={end} onChange={setEnd} onBlur={handleBlur} />
      </div>
      <div className="lg:order-4 order-3 flex justify-end">
        <MenuDropdown actions={actions} />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        rows={1}
        className="lg:order-3 order-4 col-span-full lg:col-auto input input-bordered text-sm w-full min-h-10 resize-y focus:border-primary focus:outline-none p-2"
      />
    </div>
  );
};

export default SubtitleBlock;
