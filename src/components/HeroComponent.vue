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
          <p class="h4 text" v-html="hero.tagline"/>
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
      <div class="bg-gradient"/>
      <div class="content">
        <div class="image-gradient"/>
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
  z-index: 1;
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
.bg-gradient {
  z-index: 2;
  width: 50vw;
  height: 100%;
  background-image: linear-gradient(90deg, var(--color-background) 60%, rgba(80, 80, 80, 0));
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
.image-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, transparent 50%, var(--color-background) 100%);
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 993px) and (max-width: 1200px) {
  .bg-gradient {
    width: 45vw;
    background-image: linear-gradient(90deg, var(--color-background) 50%, rgba(80, 80, 80, 0));
  }
}

@media (min-width: 769px) and (max-width: 992px) {
  .bg-gradient {
    width: 20vw;
    background-image: linear-gradient(90deg, var(--color-background) 25%, rgba(80, 80, 80, 0));
  }
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
  .bg-gradient {
    width: auto;
  }
}
</style>
