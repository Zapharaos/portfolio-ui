<script setup lang="ts">
import { computed, ref } from 'vue'
import WorkItem from '@/components/WorkItem.vue'
import type { Work } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  works: Work[]
}>()

// Reactive state variable to store the currently active work index
let activeIndex = ref(0);

/**
 * This computed property returns a sorted copy of the 'projects' prop.
 * Sorts the projects based on their 'order' property in ascending order.
 * If 'props.projects' is undefined, it returns an empty array.
 *
 * @returns {Project[]} A sorted copy of the projects or an empty array.
 */
const sortedWorks = computed(() => {
  return props.works?.slice().sort((a: Work, b: Work) => a.order - b.order) || [];
});

/**
 * Checks if the provided work item is currently active based on the 'activeIndex' state.
 *
 * @param {Work} work The work item to check for active state.
 * @returns {boolean} True if the work item is active, false otherwise.
 */
const isActive = (work: Work): boolean => {
  return activeIndex.value === work.order
};

/**
 * Updates the 'activeIndex' state to the provided item order, effectively making it the active work item.
 *
 * @param {number} itemOrder The order of the work item to activate.
 */
function activateItem(itemOrder: number) {
  activeIndex.value = itemOrder
}
</script>

<template>
  <section id="work">
    <h2>Work</h2>
    <ul class="grid-container">
      <WorkItem v-for="work in sortedWorks" :key="work.title" :work="work" :isActive="isActive(work)" @click="activateItem(work.order)"/>
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