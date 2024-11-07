import { create } from "zustand";

interface SecondTollbarState {
  name: string;
  path: string;
}

const secondToolbarStore = create<SecondTollbarState>((set) => ({
  name: '',
  path: '',
  setSecontToolbarMessage: (message: string) => set({ name: message }),
  setSecontToolbarPath: (path: string) => set({ path: path }),
  resetSecondToolbar: () => set({name: '', path: ''})
}));

export default secondToolbarStore;
