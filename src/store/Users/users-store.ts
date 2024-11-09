import { create } from "zustand";
import api from "../../api";

interface AuthState {
  users: any[];
  id: string | null;
  role: string | null;
  setUser: (id: string, role: string) => void;
  getUserById: (id: string) => void;
  logout: () => void;
  counter_users: number;
  user: any;
  isLoading: boolean;
  searchValue: string;
  setPage: (page: number) => void;
  setSizePerPage: (sizePerPage: number) => void;
  modelPage: any;
}

const usersStore: any = create<AuthState>((set) => ({
  users: [],
  id: null,
  role: null,
  counter_users: 0,
  user: {},
  isLoading: false,
  searchValue: "",
  modelPage: {
    page: 1,
    sizePerPage: 10
  },
  setUser: (id, role) => set({ id, role }),
  logout: () => set({ id: null, role: null }),
  getUsers: async (page: number, limit: number) => {
    const { searchValue, modelPage } = usersStore.getState();
    set({ isLoading: true });
    const response = await api.post(
      `${process.env.REACT_APP_BASE_URL}/users/?page=${
        modelPage.page
      }&limit=${modelPage.sizePerPage}&search=${searchValue}`
    );
    if(response.data.users_response) {
      set({ users: response.data.users_response });
    }
    if(response.data.counter_users) {
      set({ counter_users: response.data.counter_users });
    }
    set({ isLoading: false });
  },
  getUserById: async (id) => {
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/${id}`
    );
    set({ isLoading: false });
    set({ user: response.data });
  },
  setCount: (count: number) => set({ counter_users: count }),
  setPage: (page: number) => {
    // @ts-ignore
    set((state: any) => ({
      modelPage: {
        ...state.modelPage,
        page,
      },
    }))
  },
  setSizePerPage: (sizePerPage: any) => {
    // @ts-ignore
    set((state: any) => ({
      modelPage: {
        ...state.modelPage,
        sizePerPage,
      }
    }))
  },
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
