<template>
  <div class="options">
    <h1>LeaderPort Settings</h1>
    <SettingsForm />
  </div>
</template>

<script setup lang="ts">
import SettingsForm from './components/SettingsForm.vue'
</script>

<style scoped>
.options {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> 
