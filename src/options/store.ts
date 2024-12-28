import { create } from "zustand";

interface OptionsState {
  // Define your state interface here
  someOption: boolean;
  setSomeOption: (value: boolean) => void;
}

export const useOptionsStore = create<OptionsState>((set) => ({
  someOption: false,
  setSomeOption: (value) => set({ someOption: value }),
}));
