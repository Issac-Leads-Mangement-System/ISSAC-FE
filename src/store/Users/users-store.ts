import { create } from "zustand";
import api from "../../api";

interface AuthState {
  users: any[];
  id: string | null;
  role: string | null;
  setUser: (id: string, role: string) => void;
  logout: () => void;
  count: number;
}

const usersStore = create<AuthState>((set) => ({
  users: [],
  id: null,
  role: null,
  count: 0,
  setUser: (id, role) => set({ id, role }),
  logout: () => set({ id: null, role: null }),
  getUsers: async (page: number, limit: number) => {
    const response = await api.post(
      `${process.env.REACT_APP_BASE_URL}/users/?page=${page + 1}&limit=${limit}`     
    );
    set({users: response.data.users_response});
    set({count: response.data.counter_users})
  },
  setCount: (count: number) => set({count: count})
}));

export default usersStore;
