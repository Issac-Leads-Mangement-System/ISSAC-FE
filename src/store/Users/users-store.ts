import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface AuthState {
  users: any[];
  id: string | null;
  role: string | null;
  setUser: (id: string, role: string) => void;
  setSelectedUser: (selectedUser: any) => void;
  getUserById: (id: string) => void;
  logout: () => void;
  counter_users: number;
  user: any;
  isLoading: boolean;
  searchValue: string;
  setPage: (page: number) => void;
  setSizePerPage: (sizePerPage: number) => void;
  selectedUser: any;
  modelPage: {
    page: number;
    sizePerPage: number;
  };
  activate_filters: {
    user_role: any;
    user_status: any;
    team_id: any;
  };
}

const usersStore: any = create<AuthState>((set) => ({
  users: [],
  id: null,
  role: null,
  team_id: null,
  counter_users: 0,
  user: {},
  isLoading: false,
  searchValue: "",
  selectedUser: {},
  modelPage: {
    page: 1,
    sizePerPage: 10,
  },
  activate_filters: {
    user_role: [],
    user_status: [],
    team_id: [],
  },
  setUser: (id, role) => set({ id, role }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setUserData: (user: any) => set({ user: user }),
  logout: () => set({ id: null, role: null }),
  getUsers: async () => {
    const { searchValue, modelPage, activate_filters } = usersStore.getState();
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/users/?page=${modelPage.page}&limit=${modelPage.sizePerPage}&search=${searchValue}`,
        activate_filters
      );
      if (response.data.users_response) {
        set({ users: response.data.users_response });
      }
      if (response.data.counter_users) {
        set({ counter_users: response.data.counter_users });
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.status,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  getUserById: async (id) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`
      );
      set({ selectedUser: response.data });
    } catch (error: any) {
      set({ selectedUser: null });
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.status,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  addUser: async (payload: any) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });
    try {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/users/add_user`,
        payload
      );

      if (response.status === 200) {
        showNotification({
          message: "משתשמש חדש נוסף בהצלחה",
          status: response.statusText,
          severity: response.status,
        });
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.status,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  editUser: async (id: number, payload: any) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });
    try {
      const response = await api.put(
        `${process.env.REACT_APP_BASE_URL}/users/edit_user/${id}`,
        payload
      );
      if (response.status === 200) {
        showNotification({
          message: "פרטי משתמש עודכנו בהצלחה",
          status: response.statusText,
          severity: response.status,
        });
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.status,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  setCount: (count: number) => set({ counter_users: count }),
  setPage: (page: number) => {
    // @ts-ignore
    set((state: any) => ({
      modelPage: {
        ...state.modelPage,
        page,
      },
    }));
  },
  setSizePerPage: (sizePerPage: any) => {
    // @ts-ignore
    set((state: any) => ({
      modelPage: {
        ...state.modelPage,
        sizePerPage,
      },
    }));
  },
  deleteUser: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.delete(
        `${process.env.REACT_APP_BASE_URL}/users/delete_user/${id}`
      );
      if (response.status === 200) {
        showNotification({
          message: "משתשמש נמחק בהצלחה",
          status: response.statusText,
          severity: response.status,
        });
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.status,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  setSearchValue: (value: string) => set({ searchValue: value }),
  resetFilters: () => {
    set({
      activate_filters: {
        user_role: [],
        user_status: [],
        team_id: [],
      },
    });
  },
  setActiveFilters: (ids: any, key: string) =>
    set((state) => ({
      activate_filters: {
        ...state.activate_filters,
        [key]: Array.from(new Set(ids)), // Elimină duplicatele
      },
    })),
}));

export default usersStore;
