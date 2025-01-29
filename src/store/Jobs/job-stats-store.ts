import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";
import usersStore from "../Users/users-store";

interface IJobsState {
  activeJob: string;
  jobById: any;
  jobLeadsById: any;
  counter_job_leads: number | undefined;
  searchValue: string;
  pagination: any;
  isLoading: boolean;
  new_status: any;
  filters: {
    lead_status_id: number[];
    user_id: number[];
    mobile_deal_success: boolean[];
  };
  create_order: any;
  getOrderBasicInfo: any;
}

const jobStatsStore = create<IJobsState>((set) => ({
  activeJob: "",
  jobById: {},
  jobLeadsById: [],
  counter_job_leads: undefined,
  searchValue: "",
  pagination: {
    pageSize: 10,
    page: 0,
  },
  filters: {
    lead_status_id: [],
    user_id: [],
    mobile_deal_success: [],
  },
  isLoading: false,
  new_status: "",
  create_order: {
    order_basic_info: {
      former_company: "",
      mobility: false,
    },
  },

  setKey: (key: string, value: string) => {
    set({ [key]: value });
  },

  setSearchValue: (value: string) => set({ searchValue: value }),

  setCreateOrder: (value: any, key: string, section: string) => {
    set((state) => ({
      create_order: {
        ...state.create_order,
        [section]: {
          ...state.create_order[section],
          [key]: value,
        },
      },
    }));
  },

  getOrderBasicInfo: (state: any) => state.create_order.order_basic_info,

  getJobById: async () => {
    try {
      const { activeJob } = jobStatsStore.getState();
      const response = await api.get(`
        ${process.env.REACT_APP_BASE_URL}/jobs/${activeJob}
        `);
      set({ jobById: response.data });
    } catch (err) {
      console.log("err", err);
    }
  },

  getJobLeadsById: async (isPlayScreen: boolean = false) => {
    try {
      const { user }: any = usersStore.getState();
      set({ isLoading: true });
      const { activeJob, searchValue, pagination, filters } =
        jobStatsStore.getState();
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/jobs/${activeJob}/leads?${
          isPlayScreen
            ? ""
            : `page=${pagination.page + 1}&limit=${pagination.pageSize}`
        }&search=${searchValue}&play_mode=${isPlayScreen ? true : false}`,
        filters
      );
      if (response.data.job_leads_response?.length > 0) {
        response.data.job_leads_response.forEach((jobLead: any) => {
          if (jobLead.user.user_id === user.id) {
            jobLead.isCurrentUser = true;
          } else {
            jobLead.isCurrentUser = false;
          }
          return jobLead;
        });
      }
      set({
        jobLeadsById: response.data.job_leads_response,
        counter_job_leads: response.data.counter_job_leads,
        isLoading: false,
      });
    } catch (err) {
      console.log("err", err);
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

  deleteJobLead: async (idJob: number, idLeadJob: number) => {
    set({ isLoading: true });
    const { showNotification } = useNotificationStore.getState();
    try {
      const response = await api.delete(
        `${process.env.REACT_APP_BASE_URL}/jobs/${idJob}/leads/${idLeadJob}/delete`
      );
      showNotification({
        message: "ליד הוסר מהעבודה בהצלחה",
        status: response.statusText,
        severity: response.status,
      });
      set({ isLoading: false });
    } catch (error: any) {
      showNotification({
        message: "שגיאה בהסרת הליד",
        status: error.status,
        severity: error.severity,
      });
      set({ isLoading: false });
    }
  },

  updateJobLead: async (idJob: number, idLeadJob: number, new_status: any) => {
    set({ isLoading: true });
    const { showNotification } = useNotificationStore.getState();

    try {
      const response = await api.put(
        `${process.env.REACT_APP_BASE_URL}/jobs/${idJob}/leads/${idLeadJob}?lead_status_id=${new_status}`
      );
      showNotification({
        message: "ליד עודכן בעבודה בהצלחה",
        status: response.statusText,
        severity: response.status,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      showNotification({
        message: "שגיאה בעדכון הליד",
        status: error.status,
        severity: error.severity,
      });
      set({ isLoading: false });
    }
  },

  submitCreateOrder: async (values: any) => {
    const response = await api.post(
      `${process.env.REACT_APP_BASE_URL}/orders/create_order`,
      values
    );
  },

  setActiveFilters: (ids: any, key: string) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: Array.from(new Set(ids)), // Elimină duplicatele
      },
    })),
  resetFilters: () => {
    set({
      filters: {
        lead_status_id: [],
        user_id: [],
        mobile_deal_success: [],
      },
    });
  },
  resetJobLeadsById: () => {
    set({ jobLeadsById: [] });

    // return new Promise<void>((resolve) => {
    //   const unsubscribe = jobStatsStore.subscribe((state) => {
    //     if (state.jobLeadsById.length === 0) {
    //       unsubscribe(); // Dezabonare
    //       resolve(); // Rezolvăm promisiunea
    //     }
    //   });
    // });
  },

  resetPagination: () => {
    set({
      pagination: {
        pageSize: 10,
        page: 0,
      },
    });
  },
}));

export default jobStatsStore;
