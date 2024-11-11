import { create } from "zustand";
import api from "../../api";

interface LeadsTypesState {
  types: any[];
  status: any[];
  id: string | null;
  count: number;
  //   teamsOptions: any[];
  //   team: any;
  isLoading: boolean;
  searchValue: string;
  getStatus: any;
}

const leadsTypesStore = create<LeadsTypesState>((set) => ({
  types: [],
  status: [],
  id: null,
  //   role: null,
  count: 0,
  //   teamsOptions: [],
  //   team: {},
  isLoading: false,
  searchValue: "",
  getTypes: async (page: number, limit: number) => {
    const { searchValue } = leadsTypesStore.getState();
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/leads/types/?page=${
        page + 1
      }&limit=${limit}&search=${searchValue}`
    );
    set({ types: response.data.leads_types_response });
    set({ count: response.data.counter_leads_types });
    set({ isLoading: false });
  },

  getStatus: async (page: number, limit: number) => {
    const { searchValue } = leadsTypesStore.getState();
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/leads/statuses/?page=${
        page + 1
      }&limit=${limit}&search=${searchValue}`
    );
    set({ types: response.data });
    set({ count: response.data.length });
    set({ isLoading: false });
  },

  saveStatus: async (body: any) => {
    set({ isLoading: true });
    const response = await api.post(`${process.env.REACT_APP_BASE_URL}/leads/statuses/add_status`, body);
    if(response) {
      const { getStatus } = leadsTypesStore.getState();
      // remove this hardcoded
      getStatus(0, 10);
    }
    set({ isLoading: false });
  },
  resetStore: () => {
    set({
      types: [],
      status: [],
      id: null,
      count: 0,
      isLoading: false,
      searchValue: "",
    })
  }
  //   getAllTeams: async () => {
  //     set({ isLoading: true });
  //     const response = await api.get(
  //       `${process.env.REACT_APP_BASE_URL}/users/teams/?page=1`
  //     );
  //     set({ isLoading: false });
  //     set({ teamsOptions: response.data.teams_response });
  //   },
  //   getTeam: async (id: number) => {
  //     set({ isLoading: true });
  //     const response = await api.get(
  //       `${process.env.REACT_APP_BASE_URL}/users/teams/${id}`
  //     );
  //     set({ isLoading: false });
  //     set({ team: response.data });
  //   },
  //   setCount: (count: number) => set({ count: count }),
  //   deleteTeam: async (id: number) => {
  //     set({ isLoading: true });
  //     await api.delete(
  //       `${process.env.REACT_APP_BASE_URL}/users/delete_team/${id}`
  //     );
  //     set({ isLoading: false });
  //   },
  //   setSearchValue: (value: string) => set({ searchValue: value }),
}));

export default leadsTypesStore;
