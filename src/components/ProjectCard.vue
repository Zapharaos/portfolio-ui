<script setup lang="ts">
import type { Project } from '@/types/models'
const props = defineProps<{
  project: Project
}>()
</script>

<template>
  <li>
    <a :href="props.project.url" target="_blank" class="project-card"  :class="{ 'clickable': props.project.url }">
      <h3>
        {{ props.project.title }}
        <span v-if="props.project.url">
          <svg xmlns="http://www.w3.org/2000/svg" class="link-open" width="24" height="24"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>
        </span>
      </h3>
      <img v-if="props.project.image" :src="props.project.image" :alt="props.project.title"/>
      <p>{{ props.project.description }}</p>
      <ul class="technologies">
        <li v-for="technology in props.project.technologies" :key="technology" class="technologies-tag">
          {{ technology }}
        </li>
      </ul>
    </a>
  </li>
</template>

<style scoped>
.project-card {
  background-color: #2F2516;
  border: solid 3px transparent;
  border-radius: 10px;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  text-decoration: none;
}
h3 {
  font-size: 2rem;
}
.link-open {
  visibility: hidden;
  fill: orange;
  opacity: 0;
}
img {
  max-width: 100%;
  margin: 5%;
  border-radius: 10px;
  box-shadow: 0 0 25px 25px rgba(93, 63, 17, 0.375);
}
p {
  text-align: justify;
}
.technologies {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.technologies-tag {
  border-radius: 9999px;
  color: orange;
  background-color: #5D3F11;
  font-size: .75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
}

.project-card, .link-open, img {
  transition: all 0.5s ease-in-out;
}
.project-card:hover {
  background-color: #423214;
  border-color: #573E11;
}
.project-card:hover .link-open {
  visibility: initial;
  opacity: 1;
}
.project-card:hover img{
  box-shadow: 0 0 25px 25px rgba(93, 63, 17, 0.75);
}
</style>
