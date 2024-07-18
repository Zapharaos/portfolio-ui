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
        <div class="image-container">
          <span
              v-if="about.image.creditsUrl"
              class="caption credits"
          >
            Credits :
            <a :href="about.image.creditsUrl" type="_blank">
              {{ about.image.creditsShortUrl ? about.image.creditsShortUrl : about.image.creditsUrl }}
            </a>
          </span>
          <img
              :src="about.image.file"
              :alt="about.image.name"
              class="about-image"
          />
        </div>
        <div
            v-if="about.imageResponsive"
            class="responsive-image-container"
        >
          <img
              :src="about.imageResponsive.file"
              :alt="about.image.name"
              class="about-image-responsive"
          />
          <span
              v-if="about.imageResponsive.creditsUrl"
              class="caption credits"
          >
            Credits :
            <a :href="about.imageResponsive.creditsUrl" type="_blank">
              {{ about.imageResponsive.creditsShortUrl ? about.imageResponsive.creditsShortUrl : about.imageResponsive.creditsUrl }}
            </a>
          </span>
        </div>
        <p class="text about" v-html="about.description"/>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
}

/* Image containers */
.image-container, .responsive-image-container {
  max-width: clamp(250px, 20vw, 300px);
}
.image-container {
  display: flex;
}
.responsive-image-container {
  display: none;
}
img {
  max-width: 100%;
}

/* Credits */
.credits {
  text-align: center;
  margin-top: 0.5rem;
}
.credits a {
  color: var(--color-alternative);
}

/* Credits in desktop mode */
.image-container .credits {
  opacity: 0;
  writing-mode: vertical-rl;
  transform: rotate(-180deg);
  transition: all 0.5s ease-in-out;
}
.image-container:hover {
  cursor: pointer;
}
.image-container:hover .credits {
  opacity: 1;
}

/* About */
.about {
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
  .image-container {
    display: none;
  }
  .responsive-image-container {
    display: flex;
    flex-direction: column;
  }
}
</style>