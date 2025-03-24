import { useState, useRef } from "react";
import { UploadCloudIcon } from "lucide-react";
import { useUploadSubtitle } from "../../hooks/hooks";

const AddSubtitleButton = () => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadSubtitle } = useUploadSubtitle();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) uploadSubtitle(file);
  };

  return (
    <label
      className={`flex flex-col justify-center items-center border-2 border-dashed rounded-lg w-full aspect-square cursor-pointer p-4 transition ${
        dragActive
          ? "bg-gray-200 dark:bg-gray-700 border-gray-400"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) uploadSubtitle(file);
      }}
    >
      <input
        type="file"
        accept=".srt"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
        onClick={(e) => e.stopPropagation()}
      />
      <UploadCloudIcon className="size-12 text-primary" />
      <span className="text-sm text-gray-500 text-center">
        Drag & Drop or Click to Upload (.srt only)
      </span>
    </label>
  );
};

export default AddSubtitleButton;
