<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";
import { useLeaderboardStore } from "../../src/stores/leaderboard";
import { useSettingsStore } from "../../src/stores/settings";

// Define types for your score object
interface Score {
  player: string;
  score: number;
}

const leaderboardStore = useLeaderboardStore();
const settingsStore = useSettingsStore();
const { scores, loading, error } = storeToRefs(leaderboardStore);
const { startAutoRefresh, stopAutoRefresh } = leaderboardStore; // actions can be destructured directly

// Start auto-refresh when component mounts
onMounted(async () => {
  await settingsStore.loadSettings();
  leaderboardStore.startAutoRefresh();
});

// Clean up when component unmounts
onUnmounted(() => {
  leaderboardStore.stopAutoRefresh();
});
</script>
<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="leaderboard-content">
      <div v-if="leaderboardStore.loading" class="loading">Loading...</div>
      <div v-else-if="leaderboardStore.error" class="error">
        {{ leaderboardStore.error }}
      </div>
      <ul v-else class="scores-list">
        <li
          v-for="(score, index) in leaderboardStore.scores"
          :key="index"
          class="score-item"
        >
          <span class="rank">#{{ index + 1 }}</span>
          <span class="player">{{ score.player }}</span>
          <span class="score">{{ score.score }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.leaderboard {
  padding: 1rem;
}

.scores-list {
  list-style: none;
  padding: 0;
}

.score-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.loading,
.error {
  text-align: center;
  padding: 1rem;
}

.error {
  color: red;
}
</style>
