import { createForm } from "@tanstack/form";
import {
  createInfiniteQuery,
  createMutation,
  createQuery,
  QueryClient,
} from "@tanstack/svelte-query";
import type { Player, Score } from "./types";

// Query Client setup
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Queries
export const useLeaderboard = createQuery({
  queryKey: ["leaderboard"],
  queryFn: async (): Promise<Score[]> => {
    const res = await fetch("/api/leaderboard");
    return res.json();
  },
});

export const usePlayerStats = createQuery({
  queryKey: ["player"],
  queryFn: async ({ playerId }): Promise<Player> => {
    const res = await fetch(`/api/players/${playerId}/stats`);
    return res.json();
  },
});

// Infinite Query for historical scores
export const useHistoricalScores = createInfiniteQuery({
  queryKey: ["scores", "historical"],
  queryFn: async ({ pageParam = 0 }) => {
    const res = await fetch(`/api/scores/historical?page=${pageParam}`);
    return res.json();
  },
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});

// Mutation for submitting new scores
export const useSubmitScore = createMutation({
  mutationFn: async (newScore: Score) => {
    const res = await fetch("/api/scores", {
      method: "POST",
      body: JSON.stringify(newScore),
    });
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["leaderboard"]);
  },
});

// Form handling with TanStack Form
export const useScoreForm = createForm({
  defaultValues: {
    score: 0,
    gameType: "",
    playerId: "",
  },
  onSubmit: async (values) => {
    await useSubmitScore.mutateAsync(values);
  },
});
