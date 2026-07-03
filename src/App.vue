<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { initAnalytics } from '@/composables/useAnalytics'

useThemeStore()

// Inject the umami tracking script once (browser-only; no-op if analytics is
// disabled or unconfigured — see src/config/analytics.ts).
onMounted(initAnalytics)
</script>

<template>
  <router-view/>
</template>