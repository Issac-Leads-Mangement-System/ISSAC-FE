import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface LeadsHistoryState {
  lead_history: any;
  isLoading: boolean;
}

const leadsHistoryStore = create<LeadsHistoryState>((set) => ({
  lead_history: [],
  isLoading: false,
  getHistoryLeadById: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();
    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/leads/history/${id}`
      );
      const transform_data = response.data.map((data: any) => {
        data.id = crypto.randomUUID();
        return data;
      })
      set({ lead_history: transform_data });
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

  resetLeadById: () => {
    set({lead_history: []})
  }
}));

export default leadsHistoryStore;
