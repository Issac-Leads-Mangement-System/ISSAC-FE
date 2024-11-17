import { create } from "zustand";
import api from "../../api";
import useNotificationStore from "../Notification/notification-store";

interface TeamsState {
  teams: any[];
  id: string | null;
  role: string | null;
  count: number;
  teamsOptions: any[];
  team: any;
  isLoading: boolean;
  searchValue: string;
  modelPage: {
    page: number;
    sizePerPage: number;
  };
}

const teamsStore = create<TeamsState>((set) => ({
  teams: [],
  id: null,
  role: null,
  count: 0,
  teamsOptions: [],
  team: {},
  isLoading: false,
  searchValue: "",
  modelPage: {
    page: 1,
    sizePerPage: 10,
  },
  getTeams: async () => {
    const { showNotification } = useNotificationStore.getState();
    const { searchValue, modelPage } = teamsStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/users/teams/?page=${modelPage.page}&limit=${modelPage.sizePerPage}&search=${searchValue}`
      );
      set({ teams: response.data.teams_response });
      set({ count: response.data.counter_teams });
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
  getAllTeams: async () => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/users/teams/?page=1`
      );
      set({ teamsOptions: response.data.teams_response });
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
  getTeam: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/users/teams/${id}`
      );
      set({ team: response.data });
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
  addTeam: async (payload: any) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });
    try {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/users/add_team`,
        payload
      );

      if (response.status === 200) {
        showNotification({
          message: "Team successfully added!",
          status: response.statusText,
          severity: response.status,
        });
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
  editTeam: async (id: number, payload: any) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.put(
        `${process.env.REACT_APP_BASE_URL}/users/edit_team/${id}`,
        payload
      );

      if (response.status === 200) {
        showNotification({
          message: "Team successfully edited!",
          status: response.statusText,
          severity: response.status,
        });
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
  deleteTeam: async (id: number) => {
    const { showNotification } = useNotificationStore.getState();

    set({ isLoading: true });

    try {
      const response = await api.delete(
        `${process.env.REACT_APP_BASE_URL}/users/delete_team/${id}`
      );

      if (response.status === 200) {
        showNotification({
          message: "Team successfully deleted!",
          status: response.statusText,
          severity: response.status,
        });
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
  setSearchValue: (value: string) => set({ searchValue: value }),
  setCount: (count: number) => set({ count: count }),
  setPage: (page: number) => {
    // @ts-ignore
    set((state: any) => ({
      modelPage: {
        ...state.modelPage,
        page,
      },
    }));
  },
  setSizePerPage: (sizePerPage: any) => {
    // @ts-ignore
    set((state: any) => ({
      modelPage: {
        ...state.modelPage,
        sizePerPage,
      },
    }));
  },
}));

export default teamsStore;
