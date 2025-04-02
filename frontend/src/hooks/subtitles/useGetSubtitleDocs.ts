import { useEffect } from "react";
import toast from "react-hot-toast";
import useSubtitleDocStore from "../../store/useSubtitleDocStore";

export const useGetSubtitleDocs = () => {
  const { docs, setDocs, loading, setLoading } = useSubtitleDocStore();

  useEffect(() => {
    const fetchSubtitleDocs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/subtitles");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setDocs(
          data.map(({ createdBy, contributors, ...doc }: any) => ({
            ...doc,
            createdBy: createdBy?.username || "Unknown",
            contributors: contributors?.map((user: any) => user.username) || [],
          }))
        );
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubtitleDocs();
  }, [setDocs, setLoading]);

  return { docs, loading };
};
