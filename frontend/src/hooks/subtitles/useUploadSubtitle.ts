import { useCallback } from "react";
import { toast } from "react-hot-toast";
import useSubtitleDocStore from "../../store/useSubtitleDocStore";

export const useUploadSubtitle = () => {
  const { addDoc } = useSubtitleDocStore();

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

        if (response.status === 409) {
          toast.error("A subtitle with this name already exists.");
          return;
        }

        const result = await response.json();
        if (response.ok) {
          toast.success("Subtitle uploaded successfully!");

          addDoc({
            id: result.subtitleDoc.id,
            name: result.subtitleDoc.name,
            createdBy: result.subtitleDoc.createdBy?.username || "Unknown",
            contributors:
              result.subtitleDoc.contributors?.map(
                (user: any) => user.username
              ) || [],
          });
        } else {
          toast.error(result.error || "Failed to upload subtitle.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload failed. Try again.");
      }
    },
    [addDoc]
  );

  return { uploadSubtitle };
};
