import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface IJobsState {
  job: {
    job_name: string;
    type_id: number | undefined;
    free_leads: number | undefined;
  };
  userTeam: any[];
  jobs: any[];
}

const jobsStore = create<IJobsState>((set) => ({
  job: {
    job_name: "",
    type_id: undefined,
    free_leads: undefined,
  },
  userTeam: [],
  jobs: [],
  inputValues: [],

  setJob: (value: any, key: string) =>
    set((state) => ({
      job: {
        ...state.job,
        [key]: value,
      },
    })),

  getFreeLeads: async () => {
    const { job } = jobsStore.getState();
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/jobs/free_leads/${job.type_id}`
    );
    console.log("zzz res", response);
    set((state) => ({
      job: {
        ...state.job,
        free_leads: response.data.total_amount_of_free_leads,
      },
    }));
  },

  getUserTeam: async () => {
    try {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/users/?page=${1}&limit=${50}`,
        {
          user_role: ["employee"],
          user_status: ["active"],
          team_id: [1],
        }
      );

      set({ userTeam: response.data.users_response });
      console.log("zzzzzz ", response.data);
    } catch (err) {
      console.log("zzz err", err);
    }
  },

  getAllJobs: async () => {
    try {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/jobs/?page=${1}&limit=${50}`
      );
      set({ jobs: response.data.jobs_response });
    } catch (err) {
      console.log("err", err);
    }
  },
}));

export default jobsStore;
