import { create } from "zustand";

interface AuthState {
  id: string | null;
  role: string | null;
  setUser: (id: string, role: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  id: null,
  role: null,
  setUser: (id, role) => set({ id, role }),
  logout: () => set({ id: null, role: null }),
}));

export default useAuthStore;
