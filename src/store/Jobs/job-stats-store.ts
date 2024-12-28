import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface IJobsState {
  activeJob: string;
  jobById: any;
  jobLeadsById: any;
  counter_job_leads: number | undefined;
  searchValue: string;
  pagination: any;
  isLoading: boolean;
  new_status: any;
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
  isLoading: false,
  new_status: "",

  setKey: (key: string, value: string) => {
    set({ [key]: value });
  },

  setSearchValue: (value: string) => set({ searchValue: value }),

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

  getJobLeadsById: async () => {
    try {
      set({ isLoading: true });
      const { activeJob, searchValue, pagination } = jobStatsStore.getState();
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/jobs/${activeJob}/leads?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}&search=${searchValue}`
      );
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
        message: "Job lead removed successfully!",
        status: response.statusText,
        severity: response.status,
      });
      set({ isLoading: false });
    } catch (error: any) {
      showNotification({
        message: "Error to delete lead job!",
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
        message: "Job lead updated successfully!",
        status: response.statusText,
        severity: response.status,
      });
      set({ isLoading: false });
    } catch (error: any) {
      showNotification({
        message: "Error to update lead job!",
        status: error.status,
        severity: error.severity,
      });
      set({ isLoading: false });
    }
  },
}));

export default jobStatsStore;
