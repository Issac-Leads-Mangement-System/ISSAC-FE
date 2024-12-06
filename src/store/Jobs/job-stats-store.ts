import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface IJobsState {
 activeJob: string
 jobById: any
 jobLeadsById: any
}

const jobStatsStore = create<IJobsState>((set) => ({
  activeJob: "",
  jobById: {},
  jobLeadsById: [],

  setKey: (key: string, value: string) =>  {
    set({[key]: value});
  },

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
      const { activeJob } = jobStatsStore.getState();
      const response = await api.post(`${process.env.REACT_APP_BASE_URL}/jobs/${activeJob}/leads`);
      set({jobLeadsById: response.data.job_leads_response})
    } catch (err) {
      console.log('err', err)
    }
  }
}));

export default jobStatsStore;
