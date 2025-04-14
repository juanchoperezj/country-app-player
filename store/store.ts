import { create } from 'zustand';

export interface AppState {
  continent?: string;
  currency?: string;
  setContinent: (continent: string) => void;
  setCurrency: (currency: string) => void;
  resetFilter: () => void;
}

export const useStore = create<AppState>((set) => ({
  continent: undefined,
  currency: undefined,
  setContinent: (continent: string) => set({ continent }),
  setCurrency: (currency: string) => set({ currency }),
  resetFilter: () => set({ continent: undefined, currency: undefined }),
}));
