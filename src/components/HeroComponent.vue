<script setup lang="ts">
// Define the props for the component
import type {Hero} from "@/types/models";

const props = defineProps<{
  hero: Hero
}>()

/**
 * Prevents default link behavior and scrolls to the target section smoothly.
 *
 * @param id The element's id to head to.
 */
const scrollToSection = (id: string) => {
  // Scroll to the target section smoothly
  document.getElementById(id as string)?.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
  <section id="hero">
    <div class="section-container">
      <div class="hero-body">
        <h1 class="hero-title">{{ hero.title }}</h1>
        <p class="h4 tagline" v-html="hero.tagline"></p>
        <a @click="scrollToSection('work')" class="btn text-button">
          <p>{{ hero.callToActionContent }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"></path>
          </svg>
        </a>
      </div>
    </div>
<!--    <img :src="hero.backgroundImage.file" :alt="hero.backgroundImage.name" />-->
  </section>
</template>

<style scoped>
.section-container {
  height: 100%;
  display: flex;
}
section {
  min-height: 100svh;
  width: 100%;
  padding: 10% 10% 0;
  background: rgb(0,0,0);
  background: linear-gradient(150deg, rgba(0,0,0,1) 0%, rgba(72,72,72,1) 100%);
  clip-path: inset(0);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}

.hero-body {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  z-index: 2;
  align-self: flex-start;
  max-width: var(--container-max-width);
}

.hero-title {
  margin-top: 0;
  margin-bottom: 0;
}

svg {
  height: 1.5rem;
  width: auto;
  transform: rotate(90deg);
}

img {
  z-index: 0;
  filter: drop-shadow(0px 0px 20px orange);
  width: auto;
  height: max-content;
  align-self: flex-end;
  border-radius: 0;
  min-width: 30rem;
}

@media (max-width: 1500px) {
  section {
    flex-direction: column;
    justify-content: space-between;
  }
  img {
    min-width: 25rem;
  }
}

@media (max-width: 1200px) {
  section {
    padding-top: 15%;
  }
}

@media (max-width: 991px) {
  section {
    padding-top: 20%;
  }
  img {
    min-width: 20rem;
  }
}

@media (max-width: 768px) {
  section {
    text-align: center;
  }
  img {
    align-self: center;
    max-width: 75%;
  }
  .hero-body {
    align-items: center;
    gap: 3.5rem;
  }
}

@media (max-width: 576px) {
  img {
    min-width: 80%;
  }
}
</style>
