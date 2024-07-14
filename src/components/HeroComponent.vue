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
  <section id="hero" class="section-container">
    <div class="container">
      <div class="hero-body">
        <h1 class="hero-title">{{ hero.title }}</h1>
        <div class="tagline">
          <p class="h4" v-html="hero.tagline"></p>
        </div>
        <a @click="scrollToSection('work')" class="btn text-button">
          <p>{{ hero.callToActionContent }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="wrapper">
      <div class="bg-transition-filler"/>
      <div class="content">
        <img :src="hero.backgroundImage.file" :alt="hero.backgroundImage.name" />
        </div>
    </div>
  </section>
</template>

<style scoped>
section {
  height: 100svh;
  display: flex;
  justify-content: center;
}

.hero-body {
  z-index: 2;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
}
.hero-title {
  margin-top: 0;
  margin-bottom: 0;
}
.tagline {
  display: flex;
}
.tagline p {
  flex-grow: 1;
  width: 0;
}
svg {
  height: 1.5rem;
  width: auto;
  transform: rotate(90deg);
}

.wrapper {
  justify-content: flex-end;
  align-items: center;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.bg-transition-filler {
  z-index: 1;
  width: 60vw;
  height: 100%;
  /*background-image: linear-gradient(90deg, color-mix(in srgb, var(--color-background), grey 50%) 67%, rgba(80, 80, 80, 0));*/
  background-image: linear-gradient(90deg, var(--color-background) 67%, rgba(80, 80, 80, 0));
  position: absolute;
  top: 0;
  bottom: auto;
  left: 0;
  right: auto;
}
.content {
  max-width: 100%;
  min-height: 100vh;
  min-width: 70vw;
  position: absolute;
  top: 0;
  bottom: 0;
  left: auto;
  right: 0;
}
img {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  section {
    text-align: center;
  }
  .hero-body {
    align-items: center;
    gap: 3.5rem;
  }
  .tagline p {
    width: auto;
  }
}
</style>
