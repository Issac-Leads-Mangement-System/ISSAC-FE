import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface ILeadsState {
  leads: any[];
  lead: any;
  id: string | null;
  count: number;
  isLoading: boolean;
  searchValue: string;
  activate_filters: any;
  setActiveFilters: any;
  pagination: any;
}

const leadsStore = create<ILeadsState>((set) => ({
  leads: [],
  lead: {},
  id: null,
  activate_filters: {
    lead_type_id: [],
    lead_status_id: [],
  },
  count: 0,
  isLoading: false,
  searchValue: "",
  pagination: {
    pageSize: 10,
    page: 0,
  },
  setSearchValue: (value: string) => set({ searchValue: value }),
  getLeads: async () => {
    const { searchValue, activate_filters, pagination } = leadsStore.getState();
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });

    try {
      const response: any = await api.post(
        `${process.env.REACT_APP_BASE_URL}/leads/?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}&search=${searchValue}`,
        activate_filters
      );
      set({ leads: response.data.leads_response });
      set({ count: response.data.counter_leads });
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
  getLeadById: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });
    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/leads/${id}`
      );
      set({ lead: response.data });
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
  saveLeads: async (values: any, typeOfAdd: boolean) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });
    try {
      if (typeOfAdd) {
        delete values.lead_message;
        delete values.lead_status_id;

        const formData = new FormData();
        formData.append("type_id", values.type_id); // Add `type_id`

        // Append all files from values.file (assumes it's an array of File objects)
        if (Array.isArray(values.file)) {
          values.file.forEach((file: File) => {
            formData.append("file", file); // Appends each file with a unique key
          });
        } else {
          formData.append("file", values.file); // Fallback for single file
        }

        const response = await api.post(
          `${process.env.REACT_APP_BASE_URL}/leads/upload?type_id=${values.type_id}`,
          formData
        );

        if (response.status === 200) {
          showNotification({
            message: "לידים הועלו בהצלחה למערכת",
            status: response.statusText,
            severity: response.status,
          });
        }
      } else {
        // Handle adding a single lead
        values.lead_type_id = values.type_id; // Map `type_id` to `lead_type_id`
        delete values.type_id;
        delete values.file;

        const response = await api.post(
          `${process.env.REACT_APP_BASE_URL}/leads/add_lead`,
          values
        );

        if (response.status === 200) {
          showNotification({
            message: "ליד נוסף בהצלחה",
            status: response.statusText,
            severity: response.status,
          });
        }
      }
    } catch (error: any) {
      showNotification({
        message: error.response?.data?.detail || "An error occurred.",
        status: error.response?.status || 500,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setRowsPerPage: async (pageSize: number) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        pageSize,
      },
    }));
  },

  setPage: async (page: number) => {
    set((state) => ({
      pagination: {
        ...state.pagination,
        page,
      },
    }));
  },

  setActiveFilters: (ids: any, key: string) =>
    set((state) => ({
      activate_filters: {
        ...state.activate_filters,
        [key]: Array.from(new Set(ids)), // Elimină duplicatele
      },
    })),

  updateLeads: async (values: any) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });
    delete values.last_change_user_id;
    delete values.lead_status;
    delete values.lead_type;
    values.lead_type_id = values.type_id;
    delete values.type_id;
    try {
      const response = await api.put(
        `${process.env.REACT_APP_BASE_URL}/leads/edit_lead`,
        values
      );
      if (response.status === 200) {
        showNotification({
          message: "ליד עודכן בהצלחה",
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

  deleteLeads: async (id: any) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });
    const formData = new FormData();
    formData.append("id", id);
    try {
      const response = await api.delete(
        `${process.env.REACT_APP_BASE_URL}/leads/delete_leads/`,
        { data: id }
      );
      if (response.status === 200) {
        showNotification({
          message: "ליד נמחק בהצלחה",
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
      leads: [],
      id: null,
      count: 0,
      isLoading: false,
      searchValue: "",
    });
  },

  resetFilters: () => {
    set({
      activate_filters: {
        lead_type_id: [],
        lead_status_id: [],
      },
    });
  },

  resetPagination: () => {
    set({
      pagination: {
        pageSize: 10,
        page: 0,
      }
    })
  }
}));

export default leadsStore;
