<script setup lang="ts">
import type {Work, WorkItem} from "@/types/models";
import ProjectContainer from "@/components/ProjectContainer.vue";
import ExperienceContainer from "@/components/ExperienceContainer.vue";
import {computed} from "vue";

// Define the props for the component
const props = defineProps<{
  work: Work
}>()

/**
 * This computed property returns a filtered and sorted copy of the 'items' prop.
 * Filters the items based on their 'hidden' property.
 * Sorts the items based on their 'index' property in ascending order.
 *
 * @returns {WorkItem[]} A sorted copy of the items.
 */
const prepareItems = computed(() => {
  return props.work.items.slice()
      .filter(i => !i.hidden)
      .sort((a: WorkItem, b: WorkItem) => a.index - b.index);
});
</script>

<template>
  <section id="work">
    <div
        v-for="(item, index) in prepareItems"
        :key="index"
    >
      <ProjectContainer
          v-if="item.showProjects && item.projects && item.projects.length > 0"
          :projects="item.projects"
          :title="item.title"
      />
      <ExperienceContainer
          v-else-if="item.showExperiences && item.experiences && item.experiences.length > 0"
          :experiences="item.experiences"
          :title="item.title"
      />
    </div>
  </section>
</template>

<style scoped>

</style>