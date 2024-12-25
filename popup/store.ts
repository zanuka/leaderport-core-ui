import { create } from "zustand";

interface PopupState {
  // Define your popup state interface here
}

export const usePopupStore = create<PopupState>((set) => ({
  // Define your popup state and actions here
}));
