<script setup lang="ts">
import { onMounted } from "vue";
import { useSettingsStore } from "../../src/stores/settings";

const store = useSettingsStore();

onMounted(() => {
  store.loadSettings();
});

const saveSettings = async () => {
  await store.saveSettings(store.settings);
};
</script>

<template>
  <form @submit.prevent="saveSettings" class="settings-form">
    <div class="form-group">
      <label for="apiKey">API Key</label>
      <input
        type="password"
        id="apiKey"
        v-model="store.settings.apiKey"
        placeholder="Enter your API key"
      />
    </div>

    <div class="form-group">
      <label for="refreshInterval">Refresh Interval (minutes)</label>
      <input
        type="number"
        id="refreshInterval"
        v-model="store.settings.refreshInterval"
        min="1"
        max="60"
      />
    </div>

    <div class="form-group">
      <label>
        <input type="checkbox" v-model="store.settings.notifications" />
        Enable Notifications
      </label>
    </div>

    <button type="submit" class="save-button">Save Settings</button>

    <div v-if="store.savedMessage" class="save-message">
      {{ store.savedMessage }}
    </div>
  </form>
</template>
