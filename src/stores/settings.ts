import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  apiKey: string;
  refreshInterval: number;
  notifications: boolean;
}

interface SettingsState {
  settings: Settings;
  savedMessage: string | null;
  loadSettings: () => Promise<void>;
  saveSettings: (settings: Settings) => Promise<void>;
  updateSettings: (partialSettings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        apiKey: "",
        refreshInterval: 5,
        notifications: true,
      },
      savedMessage: null,

      loadSettings: async () => {
        try {
          // If you need to load settings from an API, do it here
          // For now, persist middleware handles local storage
        } catch (error) {
          console.error("Failed to load settings:", error);
        }
      },

      saveSettings: async (settings: Settings) => {
        try {
          // If you need to save to an API, do it here
          set({ settings });
          set({ savedMessage: "Settings saved successfully!" });

          // Clear the success message after 3 seconds
          setTimeout(() => {
            set({ savedMessage: null });
          }, 3000);
        } catch (error) {
          console.error("Failed to save settings:", error);
          set({ savedMessage: "Failed to save settings" });
        }
      },

      updateSettings: (partialSettings: Partial<Settings>) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...partialSettings,
          },
        }));
      },
    }),
    {
      name: "settings-storage", // unique name for localStorage
    },
  ),
);
