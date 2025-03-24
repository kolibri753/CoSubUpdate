import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { useGetSubtitleDocs } from "./useGetSubtitleDocs";

export const useUploadSubtitle = () => {
  const { refresh } = useGetSubtitleDocs();

  const uploadSubtitle = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".srt")) {
        toast.error("Only .srt files are allowed.");
        return;
      }

      toast.success(`Uploading: ${file.name}`);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/subtitles/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const result = await response.json();
        if (response.ok) {
          toast.success("Subtitle uploaded successfully!");
          refresh();
        } else {
          toast.error(result.error || "Failed to upload subtitle.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload failed. Try again.");
      }
    },
    [refresh]
  );

  return { uploadSubtitle };
};
