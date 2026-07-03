<script setup lang="ts">
// Open Graph card, rendered at exactly 1200×630 (the standard OG size).
// It mirrors the hero's visual language so the social preview matches the landing
// section (hero title, tagline and background) and shows the brand icon. Capture it
// with `npm run og:generate` (which screenshots the /og route) or manually from the
// browser.
import type { Hero } from '@/types/models'
import { seoConfig } from '@/config/seo'

defineProps<{
  hero: Hero
}>()

// Reuse the high-res colored PWA icon (from the SEO config) as the brand mark, so
// the card is self-contained, config-driven and keeps the icon's real colors
// (unlike the monochrome favicon, which the header recolors per theme).
const brandIcon = seoConfig.icons.icon512
const siteName = seoConfig.siteName
</script>

<template>
  <div id="og-image" class="og-image">
    <div class="og-bg" v-if="hero.backgroundImage?.file">
      <img :src="hero.backgroundImage.file" :alt="hero.backgroundImage.name" />
      <div class="og-bg-gradient" />
    </div>
    <div class="og-content">
      <img v-if="brandIcon" class="og-logo" :src="brandIcon" :alt="siteName" />
      <h1 class="og-title">{{ hero.title }}</h1>
      <p class="og-tagline" v-html="hero.tagline" />
    </div>
  </div>
</template>

<style scoped>
/* Fixed, deterministic dimensions and colors so the screenshot is consistent
   regardless of the visitor's theme. */
.og-image {
  position: relative;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background: #181818;
  color: #ffffff;
  font-family: 'Montserrat', 'Open Sans', sans-serif;
}

.og-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.og-bg img {
  position: absolute;
  right: 0;
  top: 0;
  width: 70%;
  height: 100%;
  object-fit: cover;
}
/* Fade the image into the background from the left, like the hero section. */
.og-bg-gradient {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(90deg, #181818 42%, rgba(24, 24, 24, 0) 85%);
}

.og-content {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 62%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
  padding: 0 96px;
  box-sizing: border-box;
}
.og-logo {
  height: 56px;
  width: auto;
  /* Keep the intrinsic aspect ratio: without this the column flex `align-items:
     stretch` default would stretch the image to the container width. */
  align-self: flex-start;
  object-fit: contain;
  /* No color filter: use the icon's real colors (unlike the monochrome favicon). */
}
.og-title {
  margin: 0;
  font-size: 60px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -1px;
}
.og-tagline {
  margin: 0;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.35;
  opacity: 0.85;
  /* Keep the tagline to a few lines to avoid overflow on long content. */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.og-tagline :deep(br) {
  display: none;
}
</style>
