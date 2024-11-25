import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface IJobsState {
  job: {
    job_name: string,
    type_id: number | undefined,
    free_leads: number | undefined,
  },
}

const jobsStore = create<IJobsState>((set) => ({
  job: {
    job_name: '',
    type_id: undefined,
    free_leads: undefined
  },
  
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
      `${process.env.REACT_APP_BASE_URL}/jobs/free_leads/${job.type_id}`,
    );
    console.log('zzz res', response)
    set((state) => ({
      job: {
        ...state.job,
        free_leads: response.data.total_amount_of_free_leads
      }
    }))
  }
}));

export default jobsStore;
