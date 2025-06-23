import { create } from "zustand";

export interface User {
  _id: string;
  name: string;
  email: string;
  budget: string;
}

interface RootStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useRootStore = create<RootStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user: user })),
}));