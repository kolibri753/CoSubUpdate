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

        const result = await response.json();
        if (response.ok) {
          toast.success(result.message);

          addDoc({
            id: result.subtitleDoc.id,
            name: result.subtitleDoc.name,
            createdBy: result.subtitleDoc.createdBy?.username || "Unknown",
            access:
              result.subtitleDoc.contributors?.map(
                (user: any) => user.username
              ) || [],
          });
        } else {
          toast.error(result.error || "Failed to upload subtitle.");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [addDoc]
  );

  return { uploadSubtitle };
};
