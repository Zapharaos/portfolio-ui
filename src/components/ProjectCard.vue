<script setup lang="ts">
const props = defineProps(['project'])
</script>

<template>
  <li class="project-card">
    <h3>{{ props.project.title }}</h3>
    <img :src="props.project.image" :alt="props.project.title"/>
    <p>{{ props.project.description }}</p>
    <ul class="technologies">
      <li v-for="technology in props.project.technologies" :key="technology" class="technologies-tag">
        {{ technology }}
      </li>
    </ul>
  </li>
</template>

<style scoped>
.project-card {
  background-color: #484848;
  border-radius: 10px;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
h3 {
  font-size: 2rem;
}
p {
  text-align: justify;
}
.technologies {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.technologies-tag {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid orange;
  color: orange;
}

@media (max-width: 400px) {
  .project-card {
    padding: 1rem;
  }
}
</style>
