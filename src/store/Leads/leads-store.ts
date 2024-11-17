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
    page: 0
  },
  setSearchValue: (value: string) => set({ searchValue: value }),
  setActiveFilters: (value: string, key: string) =>
    set({ activate_filters: { [key]: value } }),
  getLeads: async () => {
    const { searchValue, activate_filters, pagination } = leadsStore.getState();
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });

    try {
      const response: any = await api.post(
        `${process.env.REACT_APP_BASE_URL}/leads/?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}&search=${searchValue}`, activate_filters
      );
      set({ leads: response.data.leads_response });
      set({ count: response.data.counter_leads });
    } catch (error: any) {
      showNotification({
        message: error.message,
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
        message: error.message,
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
        formData.append("type_id", values.type_id); // Adaugă `type_id`
        formData.append("file", values.file);
        const response = await api.post(
          `${process.env.REACT_APP_BASE_URL}/leads/upload?type_id=${values.type_id}`,
          formData
        );
        if (response.status === 200) {
          showNotification({
            message: "Lead successfully uploaded!",
            status: response.statusText,
            severity: response.status,
          });
        }
      } else {
        values.lead_type_id = values.type_id;
        delete values.type_id;
        delete values.file;
        const response = await api.post(
          `${process.env.REACT_APP_BASE_URL}/leads/add_lead`,
          values
        );
        if (response.status === 200) {
          showNotification({
            message: "Lead successfully added!",
            status: response.statusText,
            severity: response.status,
          });
        }
      }
    } catch (error: any) {
      showNotification({
        message: error.message,
        status: error.status,
        severity: error.severity,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setRowsPerPage: async(pageSize: number) => {
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

  addToLeadType: (ids: any) =>
    set((state) => ({
      activate_filters: {
        ...state.activate_filters,
        lead_type_id: Array.from(new Set(ids)), // Elimină duplicatele
      },
    })),

  updateLeads: async (values: any) => {
    set({isLoading: true});
    delete values.last_change_user_id;
    delete values.lead_status;
    delete values.lead_type;
    values.lead_type_id = values.type_id;
    delete values.type_id;
    const response = await api.put(`${process.env.REACT_APP_BASE_URL}/leads/edit_lead`, values);
    // set({lead: response.data});
    set({isLoading: false})
  },

  deleteLeads: async (id: number) => {
    set({isLoading: true});
    const response = await api.delete(`${process.env.REACT_APP_BASE_URL}/leads/delete_leads/${id}`);
    // set({lead: response.data});
    set({isLoading: false})
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
}));

export default leadsStore;
