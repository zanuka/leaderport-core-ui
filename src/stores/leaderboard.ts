import { create } from "zustand";

interface Score {
  player: string;
  score: number;
}

interface LeaderboardState {
  scores: Score[];
  loading: boolean;
  error: string | null;
  refreshInterval: NodeJS.Timer | null;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
  fetchScores: () => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  scores: [],
  loading: false,
  error: null,
  refreshInterval: null,

  fetchScores: async () => {
    set({ loading: true, error: null });
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/scores");
      const data = await response.json();
      set({ scores: data, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch scores",
        loading: false,
      });
    }
  },

  startAutoRefresh: () => {
    // First fetch
    get().fetchScores();

    // Set up interval for subsequent fetches
    const interval = setInterval(() => {
      get().fetchScores();
    }, 30000); // Refresh every 30 seconds

    set({ refreshInterval: interval });
  },

  stopAutoRefresh: () => {
    const { refreshInterval } = get();
    if (refreshInterval) {
      clearInterval(refreshInterval as NodeJS.Timeout);
      set({ refreshInterval: null });
    }
  },
}));
