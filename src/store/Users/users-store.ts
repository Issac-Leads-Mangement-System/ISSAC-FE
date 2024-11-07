import { create } from "zustand";
import api from "../../api";

interface AuthState {
  users: any[];
  id: string | null;
  role: string | null;
  setUser: (id: string, role: string) => void;
  getUserById: (id: string) => void;
  logout: () => void;
  count: number;
  user: any;
  isLoading: boolean;
  searchValue: string;
}

const usersStore = create<AuthState>((set) => ({
  users: [],
  id: null,
  role: null,
  count: 0,
  user: {},
  isLoading: false,
  searchValue: "",
  setUser: (id, role) => set({ id, role }),
  logout: () => set({ id: null, role: null }),
  getUsers: async (page: number, limit: number) => {
    const { searchValue } = usersStore.getState();
    set({ isLoading: true });
    const response = await api.post(
      `${process.env.REACT_APP_BASE_URL}/users/?page=${
        page + 1
      }&limit=${limit}&search=${searchValue}`
    );
    set({ isLoading: false });
    set({ users: response.data.users_response });
    set({ count: response.data.counter_users });
  },
  getUserById: async (id) => {
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`
    );
    set({ isLoading: false });
    set({ user: response.data });
  },
  setCount: (count: number) => set({ count: count }),
  deleteUser: async (id: number) => {
    set({ isLoading: true });
    await api.delete(
      `${process.env.REACT_APP_BASE_URL}/users/delete_user/${id}`
    );
    set({ isLoading: false });
  },
  setSearchValue: (value: string) => set({ searchValue: value }),
}));

export default usersStore;
