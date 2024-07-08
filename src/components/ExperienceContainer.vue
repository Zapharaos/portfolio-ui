<script setup lang="ts">
import {computed, ref} from 'vue'
import type { Experience } from '@/types/models'
import ExperienceCard from '@/components/ExperienceCard.vue'

// Define the props for the component
const props = defineProps<{
  title: string,
  experiences: Experience[]
}>()

// Reactive state variable to store the currently active experience index
let activeIndex = ref(0);

/**
 * This computed property returns a sorted copy of the 'experiences' prop.
 * Sorts the experiences based on their 'index' property in ascending order.
 *
 * @returns {Experience[]} A sorted copy of the experiences.
 */
const sortedExperiences = computed(() => {
  return props.experiences.slice().sort((a: Experience, b: Experience) => a.index - b.index);
});

/**
 * Checks if the provided experience item is currently active based on the 'activeIndex' state.
 *
 * @param {Experience} experience The experience item to check for active state.
 * @returns {boolean} True if the experience item is active, false otherwise.
 */
const isActive = (experience: Experience): boolean => {
  return activeIndex.value === experience.index
};

/**
 * Updates the 'activeIndex' state to the provided item order, effectively making it the active experience item.
 *
 * @param {Experience} experience The experience item to activate.
 */
function activate(experience: Experience) {
  activeIndex.value = experience.index
}

/**
 * Resets the 'activeIndex' state to -1, effectively collapsing all experience items.
 */
const collapse = () => {
  activeIndex.value = -1
}
</script>

<template>
  <section>
    <h2 class="center">{{ title }}</h2>
    <ul class="grid-container">
      <ExperienceCard
        v-for="(experience, index) in sortedExperiences.filter(i => !i.hidden)"
        :key="index"
        :experience="experience"
        :isActive="isActive(experience)"
        @activate="activate(experience)"
        @collapse="collapse"
      />
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