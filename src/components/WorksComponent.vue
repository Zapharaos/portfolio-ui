<script setup lang="ts">
import WorkItem from '@/components/WorkItem.vue'
import type { Work } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  works: Work[]
}>()
</script>

<template>
  <section id="work">
    <h2>Work</h2>
    <ul class="grid-container">
      <WorkItem v-for="work in props.works" :key="work.title" :work="work" />
    </ul>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 3rem
}
.grid-container {
  grid-template-columns: 1fr;
}
</style>