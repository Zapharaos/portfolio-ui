<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { computed } from 'vue'
import type { Project } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  projects: Project[] | undefined
}>()

/**
 * This computed property splits the sorted projects into even and odd groups.
 * Uses the index of the project in the sorted list to determine even/odd position.
 *
 * @returns {{ even: Project[], odd: Project[] }} An object containing even and odd project groups.
 */
const splitProjects = computed(() => {
  return {
    even: props.projects?.filter((_: Project, index: any) => index % 2 === 0),
    odd: props.projects?.filter((_: Project, index: any) => index % 2 !== 0),
  };
});
</script>

<template>
  <section id="projects">
    <h2>Projects</h2>
    <div class="grid-container">
      <ul class="projects-list responsive">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </ul>
      <ul class="projects-list">
        <ProjectCard v-for="project in splitProjects.even" :key="project.title" :project="project" />
      </ul>
      <ul class="projects-list">
        <ProjectCard v-for="project in splitProjects.odd" :key="project.title" :project="project" />
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