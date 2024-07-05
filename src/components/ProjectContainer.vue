<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { computed } from 'vue'
import type { Project } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  title: string
  projects: Project[]
}>()

/**
  * This computed property returns a sorted copy of the 'projects' prop.
  * Sorts the projects based on their 'index' property in ascending order.
  *
  * @returns {Project[]} A sorted copy of the projects.
*/
const sortedProjects = computed(() => {
  return props.projects.slice().sort((a: Project, b: Project) => a.index - b.index);
});

/**
 * This computed property splits the sorted projects into even and odd groups.
 * Uses the index of the project in the sorted list to determine even/odd position.
 *
 * @returns {{ even: Project[], odd: Project[] }} An object containing even and odd project groups.
 */
const splitProjects = computed(() => {
  return {
    even: sortedProjects.value.filter((_: Project, index: any) => index % 2 === 0),
    odd: sortedProjects.value.filter((_: Project, index: any) => index % 2 !== 0),
  };
});
</script>

<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="grid-container">
      <ul class="projects-list responsive">
        <ProjectCard
            v-for="(project, index) in sortedProjects.filter(i => !i.hidden)"
            :key="index"
            :project="project" />
      </ul>
      <ul class="projects-list">
        <ProjectCard
            v-for="(project, index) in splitProjects.even.filter(i => !i.hidden)"
            :key="index"
            :project="project" />
      </ul>
      <ul class="projects-list">
        <ProjectCard
            v-for="(project, index) in splitProjects.odd.filter(i => !i.hidden)"
            :key="index"
            :project="project" />
      </ul>
    </div>
  </section>
</template>

<style scoped>
.grid-container {
  margin-top: 3rem;
  grid-template-columns: repeat(2, 1fr);
}
.projects-list{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.projects-list.responsive {
  display: none;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  .projects-list.responsive {
    display: flex;
  }
  .projects-list:not(.responsive) {
    display: none;
  }
}

@media (max-width: 400px) {
  .projects-list {
    gap: 1rem;
  }
}
</style>