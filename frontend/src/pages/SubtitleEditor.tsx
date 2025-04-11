import { useParams } from "react-router-dom";
import { useGetSubtitleBlocks } from "../hooks/hooks";
import useSubtitleBlocksStore from "../store/useSubtitleBlocksStore";
import SubtitleBlock from "../components/subtitles/SubtitleBlock";
import OnlineUsers from "../components/subtitles/OnlineUsers";
import SocketContextProvider from "../context/SocketContext";

const SubtitleEditor = () => {
  const { id: docId } = useParams<{ id: string }>();

  if (!docId) return <p>Document ID is missing.</p>;

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
    <SocketContextProvider docId={docId}>
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
    </SocketContextProvider>
  );
};

export default SubtitleEditor;
