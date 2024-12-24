import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useSettingsStore } from "./settings";

interface Score {
  player: string;
  score: number;
}

export const useLeaderboardStore = defineStore("leaderboard", () => {
  const scores: Ref<Score[]> = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let refreshInterval: number | null = null;

  async function fetchScores() {
    loading.value = true;
    error.value = null;

    const settingsStore = useSettingsStore();
    const apiKey = settingsStore.settings.apiKey;

    if (!apiKey) {
      error.value = "API key not configured";
      loading.value = false;
      return;
    }

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      scores.value = data.scores; // Adjust based on your API response structure
    } catch (err) {
      error.value = "Failed to fetch scores";
      console.error("API error:", err);
    } finally {
      loading.value = false;
    }
  }

  async function submitScore(player: string, score: number) {
    const settingsStore = useSettingsStore();
    const apiKey = settingsStore.settings.apiKey;

    try {
      const response = await fetch("YOUR_API_ENDPOINT/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player, score }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchScores();
    } catch (err) {
      console.error("Failed to submit score:", err);
      throw err;
    }
  }

  function startAutoRefresh() {
    stopAutoRefresh(); // Clear any existing timer

    const settingsStore = useSettingsStore();
    const intervalMinutes = settingsStore.settings.refreshInterval;

    // Convert minutes to milliseconds
    const intervalMs = intervalMinutes * 60 * 1000;

    // Set up the timer
    refreshInterval = window.setInterval(() => {
      fetchScores();
    }, intervalMs);

    // Fetch immediately
    fetchScores();
  }

  function stopAutoRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  }

  return {
    scores,
    loading,
    error,
    fetchScores,
    submitScore,
    startAutoRefresh,
    stopAutoRefresh,
  };
});
