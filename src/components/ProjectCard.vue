<script setup lang="ts">
import type { Project } from '@/types/models'
import TechnologiesList from '@/components/TechnologiesList.vue'

// Define the props for the component
const props = defineProps<{
  project: Project
}>()
</script>

<template>
  <li>
    <a :href="project.url" target="_blank" class="item project-card" :class="{ 'clickable': project.url }">
      <h3 class="card-title">
        {{ project.title }}
        <span v-if="project.url">
          <svg xmlns="http://www.w3.org/2000/svg" class="link-open" width="24" height="24"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>
        </span>
      </h3>
      <div
          v-if="project.image"
          class="image-container"
      >
        <img :src="project.image.file" :alt="project.image.name" />
      </div>
      <p class="text" v-html="project.description"/>
      <TechnologiesList
          v-if="project.technologies"
          :technologies="project.technologies"
      />
    </a>
  </li>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  text-decoration: none;
  cursor: initial;
}
</style>
