<script setup lang="ts">
const props = defineProps(['project'])
</script>

<template>
  <li class="project-card">
    <h3>{{ props.project.title }}</h3>
    <img v-if="props.project.image" :src="props.project.image" :alt="props.project.title"/>
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
  /*background-color: #484848;*/
  background-color: #2F2516;
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
img {
  max-width: 100%;
  margin: 5%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
</style>
