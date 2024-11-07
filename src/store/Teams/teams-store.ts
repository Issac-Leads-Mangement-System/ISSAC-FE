import { create } from "zustand";
import api from "../../api";

interface TeamsState {
  teams: any[];
  id: string | null;
  role: string | null;
  count: number;
  teamsOptions: any[];
  team: any;
  isLoading: boolean;
  searchValue: string;
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
  getTeams: async (page: number, limit: number) => {
    const { searchValue } = teamsStore.getState();
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/?page=${
        page + 1
      }&limit=${limit}&search=${searchValue}`
    );
    set({ isLoading: false });
    set({ teams: response.data.teams_response });
    set({ count: response.data.counter_teams });
  },
  getAllTeams: async () => {
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/?page=1`
    );
    set({ isLoading: false });
    set({ teamsOptions: response.data.teams_response });
  },
  getTeam: async (id: number) => {
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/${id}`
    );
    set({ isLoading: false });
    set({ team: response.data });
  },
  setCount: (count: number) => set({ count: count }),
  deleteTeam: async (id: number) => {
    set({ isLoading: true });
    await api.delete(
      `${process.env.REACT_APP_BASE_URL}/users/delete_team/${id}`
    );
    set({ isLoading: false });
  },
  setSearchValue: (value: string) => set({ searchValue: value }),
}));

export default teamsStore;
