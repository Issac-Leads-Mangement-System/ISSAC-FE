import { create } from "zustand";

interface AuthState {
  token: string | null;
  id: string | null;
  name: string | null;
  role: string | null;
  login: (token: string, id: string, name: string, role: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  id: null,
  name: null,
  role: null,
  login: (token, id, name, role) => set({ token, id, name, role }),
  logout: () => set({ token: null, id: null, name: null, role: null }),
}));

export default useAuthStore;
