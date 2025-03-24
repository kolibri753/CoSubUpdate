import { useState, useRef } from "react";
import { UploadCloudIcon } from "lucide-react";
import { toast } from "react-hot-toast";

const AddSubtitleButton = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (file: File) => {
    if (!file.name.endsWith(".srt")) {
      toast.error("Only .srt files are allowed.");
      return false;
    }
    return true;
  };

  const handleFileUpload = (file: File) => {
    if (validateFile(file)) {
      setFileName(file.name);
      toast.success(`Uploaded: ${file.name}`);
      console.log("Uploaded file:", file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  return (
    <label
      className={`flex flex-col justify-center items-center border-2 border-dashed rounded-lg w-full aspect-square cursor-pointer p-4 transition ${
        dragActive
          ? "bg-gray-200 dark:bg-gray-700 border-gray-400"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".srt"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
        onClick={(e) => e.stopPropagation()} // Prevents double triggering issue
      />
      {fileName ? (
        <span className="text-sm text-primary text-center">{fileName}</span>
      ) : (
        <>
          <UploadCloudIcon className="size-12 text-primary" />
          <span className="text-sm text-gray-500 text-center">
            Drag & Drop or Click to Upload (.srt only)
          </span>
        </>
      )}
    </label>
  );
};

export default AddSubtitleButton;
