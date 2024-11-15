import { create } from "zustand";
import api from "../../api";

interface LeadsTypesState {
  statuses: any[];
  status: any;
  id: string | null;
  count: number;
  isLoading: boolean;
  searchValue: string;
  getStatus: any;
  activate_filters: any;
  setActiveFilters: any;
}

const leadsStatusesStore = create<LeadsTypesState>((set) => ({
  statuses: [],
  status: {},
  id: null,
  activate_filters: {
    status_name: '',
    date: undefined,
  },
  count: 0,
  isLoading: false,
  searchValue: "",
  setSearchValue: (value: string) => set({ searchValue: value }),
  setActiveFilters: (value: string, key:string) => (set({activate_filters: {[key]: value}})),
  getStatus: async (page: number, limit: number) => {
    const { searchValue, activate_filters } = leadsStatusesStore.getState();
    set({ isLoading: true });
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/leads/statuses/?page=${
        page + 1
      }&limit=${limit}&search=${searchValue}&status_name=${activate_filters.status_name}`
    );
    set({ statuses: response.data });
    set({ count: response.data.length });
    set({ isLoading: false });
  },

  saveStatus: async (body: any) => {
    set({ isLoading: true });
    const response = await api.post(`${process.env.REACT_APP_BASE_URL}/leads/statuses/add_status`, body);
    if(response) {
      const { getStatus } = leadsStatusesStore.getState();
      // remove this hardcoded
      getStatus(0, 10);
    }
    set({ isLoading: false });
  },

  deleteStatuses: async(id: any) => {
    set({isLoading: true});
    const response = await api.delete(`${process.env.REACT_APP_BASE_URL}/leads/statuses/delete_status/${id}`);
    if(response) {
      console.log('zzz res', response)
    }

    set({isLoading: false});
  },

  getLeadStatusesById: async (id: any) => {
    set({isLoading: true});
    const response = await api.get(`${process.env.REACT_APP_BASE_URL}/leads/statuses/${id}`);
    // if(response) {
    //   // set({})
    //   console.log('zzz store get by id ',response.data)
      set({status: response.data})
    // }
    set({isLoading: false});
  },

  updateStatus: async (values: any) => {
    set({isLoading: true});
    const response = await api.put(`${process.env.REACT_APP_BASE_URL}/leads/statuses/edit_status/${values.id}`, values)
    set({isLoading: false});
  },
  resetStore: () => {
    set({
      statuses: [],
      id: null,
      count: 0,
      isLoading: false,
      searchValue: "",
      
    })
  },

  resetFilters: () => {
    set({
      activate_filters: {
        status_name: ''
      }
    })
  }
}));



export default leadsStatusesStore;
