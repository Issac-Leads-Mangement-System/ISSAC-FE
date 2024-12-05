import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";
import usersStore from "../Users/users-store";

interface IJobsState {
  job: {
    job_id: undefined;
    job_name: string;
    type_id: number | undefined;
    free_leads: number;
    leads_per_employee: any;
  };
  userTeam: any[];
  jobs: any[];
  inputValues: any[];
  leadInputValue: number;
  infoLeadsMessage: number;
  counter_jobs: number;
  pagination: {
    pageSize: number;
    page: number;
  };
  searchValue: string;
}

const jobsStore = create<IJobsState>((set) => ({
  job: {
    job_id: undefined,
    job_name: "",
    type_id: undefined,
    free_leads: 0,
    leads_per_employee: [],
  },
  userTeam: [],
  jobs: [],
  inputValues: [],
  leadInputValue: 0,
  infoLeadsMessage: 0,
  counter_jobs: 0,
  pagination: {
    pageSize: 10,
    page: 0,
  },
  searchValue: "",

  setJob: (value: any, key: string) =>
    set((state) => ({
      job: {
        ...state.job,
        [key]: value,
      },
    })),
  setLeadsPerEmployee: (id: string, value: number) =>
    set((state) => ({
      job: {
        ...state.job,
        leads_per_employee: state.job.leads_per_employee.map((input: any) =>
          input.id === id ? { ...input, value } : input
        ),
      },
    })),
  setSearchedValue: (value: string) => set({ searchValue: value }),

  getFreeLeads: async () => {
    const { job } = jobsStore.getState();
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/jobs/free_leads/${job.type_id}`
    );
    set((state) => ({
      job: {
        ...state.job,
        free_leads: response.data.total_amount_of_free_leads,
      },
      infoLeadsMessage: response.data.total_amount_of_free_leads,
    }));
  },

  getUserTeam: async () => {
    try {
      const { searchValue, pagination } = jobsStore.getState();
      const { user } = usersStore.getState();
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/users/?page=${1}&limit=${50}`,
        {
          user_role: ["employee"],
          user_status: ["active"],
          team_id: [user.team_id],
        }
      );

      set({ userTeam: response.data.users_response });
      const arrLeadsPerEmployee = response.data.users_response.map(
        ({ id, first_name }: any) => {
          return {
            id: crypto.randomUUID(),
            user_id: id,
            first_name,
            value: 0,
          };
        }
      );
      set((state) => ({
        job: {
          ...state.job,
          leads_per_employee: arrLeadsPerEmployee,
        },
      }));
    } catch (err) {
      console.log("zzz err", err);
    }
  },

  getAllJobs: async () => {
    try {
      const { searchValue, pagination } = jobsStore.getState();
      // ?page=${1}&limit=${50}
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/jobs/?page=${
          pagination.page + 1
        }&limit=${pagination.pageSize}&search=${searchValue}`
      );
      set({
        jobs: response.data.jobs_response,
        counter_jobs: response.data.counter_jobs,
      });
    } catch (err) {
      console.log("err", err);
    }
  },

  createLeadsJob: async () => {
    try {
      const { job } = jobsStore.getState();
      for (let i = 0; i < job.leads_per_employee.length; i++) {
        delete job.leads_per_employee[i].id;
        delete job.leads_per_employee[i].first_name;
        job.leads_per_employee[i].total_associated_leads =
          job.leads_per_employee[i].value;
        delete job.leads_per_employee[i].value;
      }
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/jobs/create_leads_job`,
        {
          job_id: job.job_id,
          leads_per_employee: job.leads_per_employee,
        }
      );
    } catch (err) {
      console.log("err", err);
    }
  },

  createInProgressJob: async () => {
    try {
      const { job } = jobsStore.getState();
      if (job.free_leads) {
        const response = await api.post(
          `${process.env.REACT_APP_BASE_URL}/jobs/create_in_progress_job`,
          {
            job_name: job.job_name,
            type_id: job.type_id,
            total_leads: job.free_leads,
          }
        );
        if (response.data) {
          set((state) => ({
            job: {
              ...state.job,
              job_id: response.data.id,
            },
          }));
        }
      }
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

  resetStore: () => {
    set({
      job: {
        job_id: undefined,
        job_name: "",
        type_id: undefined,
        free_leads: 0,
        leads_per_employee: [],
      },
      userTeam: [],
      jobs: [],
      inputValues: [],
      leadInputValue: 0,
    });
  },
}));

export default jobsStore;
