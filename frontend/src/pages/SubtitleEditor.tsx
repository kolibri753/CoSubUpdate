import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useSubtitleBlocksStore from "../store/useSubtitleBlocksStore";
import toast from "react-hot-toast";

const SubtitleEditor = () => {
  const { id } = useParams();
  const { blocks, loading, setBlocks, setLoading, clearBlocks } =
    useSubtitleBlocksStore();

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
        toast.error(err.message || "Failed to fetch document.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
    return clearBlocks;
  }, [id, setBlocks, setLoading, clearBlocks]);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subtitle Blocks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="bg-base-100 rounded-xl p-4 shadow border"
            >
              <p className="text-sm text-gray-500">
                {block.startTime}s - {block.endTime}s
              </p>
              <p className="text-lg">{block.text}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default SubtitleEditor;
