import { create } from "zustand";

export type SubtitleBlock = {
  id: string;
  docId: string;
  text: string;
  startTime: string;
  endTime: string;
};

interface SubtitleBlocksState {
  blocks: SubtitleBlock[];
  loading: boolean;
  addBlock: (block: SubtitleBlock) => void;
  updateBlock: (block: SubtitleBlock) => void;
  deleteBlock: (id: string) => void;
  setBlocks: (blocks: SubtitleBlock[]) => void;
  setLoading: (loading: boolean) => void;
  clearBlocks: () => void;
}

const useSubtitleBlocksStore = create<SubtitleBlocksState>((set) => ({
  blocks: [],
  loading: false,
  addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),
  updateBlock: (updated) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === updated.id ? updated : b)),
    })),
  deleteBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
    })),
  setBlocks: (blocks) => set({ blocks }),
  setLoading: (loading) => set({ loading }),
  clearBlocks: () => set({ blocks: [] }),
}));

export default useSubtitleBlocksStore;
