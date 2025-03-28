import { create } from "zustand";

export type User = {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
};

interface UserState {
  users: User[];
  loading: boolean;
  setUsers: (users: User[]) => void;
  setLoading: (loading: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  setUsers: (users) => set({ users }),
  setLoading: (loading) => set({ loading }),
}));

export default useUserStore;
