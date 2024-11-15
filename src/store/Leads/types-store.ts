import { create } from "zustand";
import api from "../../api";

interface LeadsTypesState {
  types: any[];
  statuses: any[];
  status: any;
  id: string | null;
  count: number;
  //   teamsOptions: any[];
  //   team: any;
  isLoading: boolean;
  searchValue: string;
  filterStatuses: any;
}

const leadsTypesStore = create<LeadsTypesState>((set) => ({
  types: [],
  statuses: [],
  status: {},
  id: null,
  filterStatuses: {
    status_name: '',
  },
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

  resetStore: () => {
    set({
      types: [],
      id: null,
      count: 0,
      isLoading: false,
      searchValue: "",
    })
  }
}));

export default leadsTypesStore;
