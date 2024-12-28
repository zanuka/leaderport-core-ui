import { SuiClient } from "@mysten/sui/client";
import { create } from "zustand";

const NETWORK_URL = import.meta.env.VITE_NETWORK_URL as string;
const PACKAGE_ADDRESS = import.meta.env.VITE_PACKAGE_ADDRESS as string;

if (!NETWORK_URL || !PACKAGE_ADDRESS) {
  throw new Error("Missing environment variables");
}

const suiClient = new SuiClient({ url: NETWORK_URL });

interface Score {
  player: string;
  score: number;
  timestamp: number;
}

interface LeaderboardState {
  scores: Score[];
  loading: boolean;
  error: string | null;
  refreshInterval: ReturnType<typeof setInterval> | null;
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
      // Use a valid filter key for the Sui TypeScript SDK
      const transactions = await suiClient.queryTransactionBlocks({
        filter: {
          InputObject: PACKAGE_ADDRESS,
        },
        options: {
          showEffects: true,
          showInput: true,
        },
      });

      // Transform transactions into scores
      const scores = transactions.data.map((tx) => ({
        player: tx.transaction?.data.sender || "unknown",
        score: 1,
        timestamp: Date.now(),
      }));

      set({ scores, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch scores",
        loading: false,
      });
    }
  },

  startAutoRefresh: () => {
    get().fetchScores();
    const interval = setInterval(() => {
      get().fetchScores();
    }, 30000); // Refresh every 30 seconds
    set({ refreshInterval: interval });
  },

  stopAutoRefresh: () => {
    const { refreshInterval } = get();
    if (refreshInterval) {
      clearInterval(refreshInterval);
      set({ refreshInterval: null });
    }
  },
}));
