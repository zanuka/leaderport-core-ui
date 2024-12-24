<template>
  <div class="popup">
    <h1>LeaderPort</h1>
    <LeaderboardDisplay />
  </div>
</template>

<script setup lang="ts">
import LeaderboardDisplay from "./components/LeaderboardDisplay.vue";
</script>

<style scoped>
.popup {
  width: 300px;
  padding: 16px;
}
</style>
