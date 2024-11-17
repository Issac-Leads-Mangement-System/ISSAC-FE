import { create } from "zustand";
import api from "../../api";

interface LeadsTypesState {
  types: any[];
  type: any;
  id: string | null;
  count: number;
  isLoading: boolean;
  searchValue: string;
  filterStatuses: any;
}

const leadsTypesStore = create<LeadsTypesState>((set) => ({
  types: [],
  type: {},
  id: null,
  filterStatuses: {
    status_name: "",
  },
  count: 0,
  isLoading: false,
  searchValue: "",

  setSearchValue: (value: string) => set({ searchValue: value }),
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

  getLeadsTypeById: async (id: number) => {
    set({isLoading: true});
    const response = await api.get(`${process.env.REACT_APP_BASE_URL}/leads/types/${id}`)
    if(response) {
      set({type: response.data})
    }
    set({isLoading: false});
  },

  saveTypes: async (value: any) => {
    set({ isLoading: true });
    const response = await api.post(
      `${process.env.REACT_APP_BASE_URL}/leads/types/add_type`,
      value
    );
    set({ isLoading: false });
  },

  updateType: async (value: any) => {
    set({isLoading: true});
    const response = await api.put(`${process.env.REACT_APP_BASE_URL}/leads/types/edit_type/${value.id}`, value)
    set({isLoading: false});
  },

  deleteType: async (id: number) => {
    set({isLoading: true});
    const response = await api.delete(`${process.env.REACT_APP_BASE_URL}/leads/types/delete_type/${id}`)
    set({isLoading: false});
  },
  resetStore: () => {
    set({
      types: [],
      id: null,
      count: 0,
      isLoading: false,
      searchValue: "",
    });
  },
}));

export default leadsTypesStore;
