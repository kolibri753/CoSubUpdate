import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import useSubtitleDocStore from "../../store/useSubtitleDocStore";

export const useGetSubtitleDocs = () => {
  const { setDocs, setLoading } = useSubtitleDocStore();

  const fetchSubtitleDocs = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/subtitles");
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setDocs(
        data.map((doc: any) => ({
          ...doc,
          createdBy: doc.createdBy?.username || "Unknown",
          contributors:
            doc.contributors?.map((user: any) => user.username) || [],
        }))
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [setDocs, setLoading]);

  useEffect(() => {
    fetchSubtitleDocs();
  }, [fetchSubtitleDocs]);

  return { refresh: fetchSubtitleDocs, ...useSubtitleDocStore() };
};
