<script setup lang="ts">
import type { Technologies } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  technologies: Technologies
}>()
</script>

<template>
  <ul class="technologies">
    <li v-for="technology in props.technologies" :key="technology" class="technologies-tag">
      {{ technology }}
    </li>
  </ul>
</template>

<style scoped>
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