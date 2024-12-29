import { create } from "zustand";

// Define interfaces for each store
interface OptionsState {
  someOption: boolean;
  setSomeOption: (value: boolean) => void;
  network: "testnet" | "mainnet";
  setNetwork: (network: "testnet" | "mainnet") => void;
  updateFrequency: number;
  setUpdateFrequency: (seconds: number) => void;
}

interface PopupState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  // Add other popup-specific state
}

// Create stores
export const useOptionsStore = create<OptionsState>((set) => ({
  someOption: false,
  setSomeOption: (value) => set({ someOption: value }),
  network: "testnet",
  setNetwork: (network) => set({ network }),
  updateFrequency: 30,
  setUpdateFrequency: (seconds) => set({ updateFrequency: seconds }),
}));

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));

// You can also create a combined store if needed
export const useStore = () => {
  const options = useOptionsStore();
  const popup = usePopupStore();

  return {
    options,
    popup,
  };
};
