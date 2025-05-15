import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useSubtitleBlocksStore from "../../store/useSubtitleBlocksStore";

export const useGetSubtitleBlocks = () => {
  const { id } = useParams<{ id: string }>();
  const { setBlocks, setLoading, clearBlocks } = useSubtitleBlocksStore();

  useEffect(() => {
    const fetchBlocks = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/subtitles/${id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setBlocks(data.subtitleBlocks);
      } catch (err: any) {
        toast.error(err.message || "Failed to get document.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
    return clearBlocks;
  }, [id, setBlocks, setLoading, clearBlocks]);
};
