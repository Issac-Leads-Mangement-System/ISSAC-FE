import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface LeadsTypesState {
  types: any[];
  type: any;
  id: string | null;
  count: number;
  isLoading: boolean;
  searchValue: string;
  filterStatuses: any;
}

const leadsTypesStore = create<LeadsTypesState>((set) => ({
  types: [],
  type: {},
  id: null,
  filterStatuses: {
    status_name: "",
  },
  count: 0,
  isLoading: false,
  searchValue: "",

  setSearchValue: (value: string) => set({ searchValue: value }),
  getTypes: async (page: number, limit: number) => {
    const { searchValue } = leadsTypesStore.getState();
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/leads/types?page=${
          page + 1
        }&limit=${limit}&search=${searchValue}`
      );
      set({ types: response.data.leads_types_response });
      set({ count: response.data.counter_leads_types });
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

  getLeadsTypeById: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/leads/types/${id}`
      );
      if (response) {
        set({ type: response.data });
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

  saveTypes: async (value: any) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });

    try {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/leads/types/add_type`,
        value
      );
      if (response.status === 200) {
        showNotification({
          message: "Type successfully added!",
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

  updateType: async (value: any) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });
    try {
      const response = await api.put(
        `${process.env.REACT_APP_BASE_URL}/leads/types/edit_type/${value.id}`,
        value
      );
      if (response.status === 200) {
        showNotification({
          message: "Type successfully edited!",
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

  deleteType: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });

    try {
      const response = await api.delete(
        `${process.env.REACT_APP_BASE_URL}/leads/types/delete_type/${id}`
      );
      if (response.status === 200) {
        showNotification({
          message: "Type successfully deleted!",
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
  resetStore: () => {
    set({
      types: [],
      id: null,
      count: 0,
      isLoading: false,
      searchValue: "",
    });
  },
}));

export default leadsTypesStore;
