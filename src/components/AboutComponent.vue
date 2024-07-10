<script setup lang="ts">
// Define the props for the component
import type {About} from "@/types/models";

const props = defineProps<{
  about: About
}>()
</script>

<template>
  <section id="about" class="section-container">
    <div class="container presentation">
      <h2 class="section-title">About</h2>
      <div class="section-content grid">
        <img :src="about.image.file" :alt="about.image.name"/>
        <p>
          {{ about.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
}
img {
  border-radius: 1rem;
  width: inherit;
  max-width: 350px;
}
p {
  text-align: justify;
  align-self: center;
}
@media (max-width: 992px) {
  .grid {
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