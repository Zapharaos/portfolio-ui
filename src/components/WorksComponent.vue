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
    <ul class="">
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
ul {
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, calc(1000px + 2rem)));
  justify-content: center;
}
</style>