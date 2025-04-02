import { create } from "zustand";

export type AccessType = "EDIT" | "VIEW";

export type SubtitleAccess = {
  userId: string;
  username: string;
  accessType: AccessType;
};

export type SubtitleDoc = {
  id: string;
  name: string;
  createdBy: string;
  access: SubtitleAccess[];
};

interface SubtitleDocState {
  docs: SubtitleDoc[];
  loading: boolean;
  selectedDoc: SubtitleDoc | null;
  addDoc: (doc: SubtitleDoc) => void;
  deleteDoc: (id: string) => void;
  setDocs: (docs: SubtitleDoc[]) => void;
  setSelectedDoc: (doc: SubtitleDoc | null) => void;
  setLoading: (loading: boolean) => void;
  updateAccess: (docId: string, access: SubtitleAccess[]) => void;
}

const useSubtitleDocStore = create<SubtitleDocState>((set) => ({
  docs: [],
  loading: false,
  selectedDoc: null,
  addDoc: (doc) => set((state) => ({ docs: [...state.docs, doc] })),
  deleteDoc: (id) =>
    set((state) => ({ docs: state.docs.filter((doc) => doc.id !== id) })),
  setDocs: (docs) => set({ docs }),
  setSelectedDoc: (doc) => set({ selectedDoc: doc }),
  setLoading: (loading) => set({ loading }),
  updateAccess: (docId, access) =>
    set((state) => ({
      docs: state.docs.map((doc) =>
        doc.id === docId ? { ...doc, access } : doc
      ),
    })),
}));

export default useSubtitleDocStore;
