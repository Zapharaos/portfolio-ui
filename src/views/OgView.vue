<script setup lang="ts">
// Dev-only view used to produce the Open Graph share image (see /og route).
// It fetches the portfolio data and renders the OgImage card from the hero only.
import { onMounted, ref } from 'vue'
import { getUserData } from '@/services/user'
import type { Hero } from '@/types/models'
import OgImage from '@/components/OgImage.vue'

const hero = ref<Hero | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const user = await getUserData()
    hero.value = user.hero
  } catch (err) {
    error.value = (err as Error).message
  }
})
</script>

<template>
  <OgImage v-if="hero" :hero="hero" />
  <p v-else-if="error" class="center">Error while fetching data: {{ error }}</p>
</template>
