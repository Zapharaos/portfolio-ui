<script setup lang="ts">
import type { ProjectLink } from '@/types/models'

const props = defineProps<{
  link: ProjectLink
}>()

/**
 * SVG icon files are tinted with the surrounding text color via CSS `mask`, so a
 * monochrome glyph stays visible on any theme/color. Raster files (PNG, …) can't
 * be recolored, so they render as-is through a plain `<img>`.
 */
const isSvg = /\.svg(\?.*)?$/i.test(props.link.icon?.file ?? '')
</script>

<template>
  <span
    v-if="link.icon && isSvg"
    class="project-link-icon project-link-icon-mask"
    :style="{ '--icon-url': `url('${link.icon.file}')` }"
    role="img"
    :aria-label="link.icon.name"
  />
  <img
    v-else-if="link.icon"
    :src="link.icon.file"
    :alt="link.icon.name"
    class="project-link-icon project-link-icon-img"
    width="18"
    height="18"
  />
</template>

<style scoped>
.project-link-icon {
  flex-shrink: 0;
}
.project-link-icon-mask {
  width: 18px;
  height: 18px;
  background-color: currentColor;
  -webkit-mask: var(--icon-url) center / contain no-repeat;
  mask: var(--icon-url) center / contain no-repeat;
}
.project-link-icon-img {
  /* Raster icons render as-is — they can't inherit currentColor. */
  object-fit: contain;
}
</style>
