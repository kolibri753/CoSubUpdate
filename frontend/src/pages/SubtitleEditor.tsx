import { useGetSubtitleBlocks } from "../hooks/hooks";
import useSubtitleBlocksStore from "../store/useSubtitleBlocksStore";
import SubtitleBlock from "../components/subtitles/SubtitleBlock";
import OnlineUsers from "../components/subtitles/OnlineUsers";

const SubtitleEditor = () => {
  useGetSubtitleBlocks();
  const {
    blocks,
    loading,
    updateBlock,
    removeBlock,
    insertBlockBefore,
    insertBlockAfter,
  } = useSubtitleBlocksStore();

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <OnlineUsers />

      <h1 className="text-xl font-bold mb-2">Subtitle Blocks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-1">
          {blocks.map((block, index) => (
            <SubtitleBlock
              key={block.id}
              block={block}
              index={index}
              onUpdate={updateBlock}
              onInsertBefore={insertBlockBefore}
              onInsertAfter={insertBlockAfter}
              onRemove={removeBlock}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default SubtitleEditor;
