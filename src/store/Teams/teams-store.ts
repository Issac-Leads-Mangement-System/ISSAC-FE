import { create } from "zustand";
import api from "../../api";

interface AuthState {
  teams: any[];
  id: string | null;
  role: string | null;
  // setTeam: (id: string, name: string) => void;
  count: number;
  teamsOptions: any[];
  team: any;
}

const teamsStore = create<AuthState>((set) => ({
  teams: [],
  id: null,
  role: null,
  count: 0,
  teamsOptions: [],
  team: {},
  // setTeam: (id, name) => set({ id, name }),
  getTeams: async (page: number, limit: number) => {
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/?page=${
        page + 1
      }&limit=${limit}`
    );
    set({ teams: response.data.teams_response });
    set({ count: response.data.counter_teams });
  },
  getAllTeams: async () => {
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/?page=1`
    );
    set({ teamsOptions: response.data.teams_response });
  },
  getTeam: async (id: number) => {
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/${id}`
    );
    set({ team: response.data });
  },
  setCount: (count: number) => set({ count: count }),
}));

export default teamsStore;
