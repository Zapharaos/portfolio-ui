<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { computed } from 'vue'
import type { Project } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  projects: Project[] | undefined
}>()

/**
  * This computed property returns a sorted copy of the 'projects' prop.
  * Sorts the projects based on their 'order' property in ascending order.
  * If 'props.projects' is undefined, it returns an empty array.
  *
  * @returns {Project[]} A sorted copy of the projects or an empty array.
*/
const sortedProjects = computed(() => {
  return props.projects?.slice().sort((a: Project, b: Project) => a.order - b.order) || [];
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
  <section id="projects">
    <h2>Projects</h2>
    <div class="projects">
      <ul class="projects-list responsive">
        <ProjectCard v-for="project in sortedProjects" :key="project.title" :project="project" />
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
section {
  padding: 5rem;
  width: 100%;
}
h2 {
  font-size: 4rem;
  color: white;
  text-align: center;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.projects {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 750px));
  justify-content: center;
  gap: 2rem;
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
  section {
    padding: 2rem;
  }
  h2 {
    text-align: center;
  }
  .projects {
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
  section {
    padding: 1rem;
  }
  .projects {
    gap: 1rem;
  }
  .projects-list {
    gap: 1rem;
  }
}
</style>