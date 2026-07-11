<script setup lang="ts">
import { onMounted } from 'vue'
import { initAnalytics } from '@/composables/useAnalytics'

// Inject the umami tracking script once (browser-only; no-op if analytics is
// disabled or unconfigured — see src/config/analytics.ts).
onMounted(initAnalytics)
</script>

<template>
  <router-view />
</template>
