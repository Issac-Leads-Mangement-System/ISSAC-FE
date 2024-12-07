import { create } from "zustand";
import api from "../../api";

interface IJobsState {
 activeJob: string
 jobById: any
 jobLeadsById: any
 counter_job_leads: number | undefined
 searchValue: string
 pagination: any
 isLoading: boolean
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

  setKey: (key: string, value: string) =>  {
    set({[key]: value});
  },

  setSearchValue: (value: string) => set({ searchValue: value }),

  getJobById: async () => {
    try {
      const { activeJob } = jobStatsStore.getState();
      const response = await api.get(`
        ${process.env.REACT_APP_BASE_URL}/jobs/${activeJob}
        `)
        set({jobById: response.data})
    } catch (err) {
      console.log('err', err)
    }
  },

  getJobLeadsById: async () => {
    try {
      set({isLoading: true});
      const { activeJob, searchValue, pagination } = jobStatsStore.getState();
      const response = await api.post(`${process.env.REACT_APP_BASE_URL}/jobs/${activeJob}/leads?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}&search=${searchValue}`);
      set({jobLeadsById: response.data.job_leads_response, counter_job_leads: response.data.counter_job_leads, isLoading: false});
    } catch (err) {
      console.log('err', err)
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
}));

export default jobStatsStore;
