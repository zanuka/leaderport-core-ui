import { defineStore } from "pinia";

interface Settings {
  apiKey: string;
  refreshInterval: number;
  notifications: boolean;
}

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: {
      apiKey: "",
      refreshInterval: 5,
      notifications: true,
    } as Settings,
    savedMessage: "",
  }),

  actions: {
    async saveSettings(newSettings: Settings) {
      try {
        await chrome.storage.sync.set({ settings: newSettings });
        this.settings = newSettings;
        this.savedMessage = "Settings saved successfully!";
        setTimeout(() => {
          this.savedMessage = "";
        }, 3000);
      } catch (err) {
        this.savedMessage = "Error saving settings";
        console.error("Failed to save settings:", err);
      }
    },

    async loadSettings() {
      try {
        const result = await chrome.storage.sync.get("settings");
        if (result.settings) {
          this.settings = result.settings;
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    },
  },
});
