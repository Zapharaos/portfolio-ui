<script setup lang="ts">
// Define the props for the component
import type {About} from "@/types/models";

const props = defineProps<{
  about: About
}>()
</script>

<template>
  <section id="about" class="section-container">
    <div class="container">
      <h2 class="center">About</h2>
      <div class="grid-container">
        <img :src="about.image.file" :alt="about.image.name"/>
        <p>
          {{ about.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 3rem
}
.grid-container {
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
}
img {
  border: solid 0.25rem white;
  border-radius: 1rem;
  width: inherit;
}
p {
  color: white;
  font-size: 1.125rem;
  text-align: justify;
  align-self: center;
}
@media (max-width: 992px) {
  .grid-container {
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;
    align-items: center;
  }
  img {
    width: auto;
    max-width: 350px;
  }
}
</style>