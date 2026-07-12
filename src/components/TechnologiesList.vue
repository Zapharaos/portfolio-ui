<script setup lang="ts">
import type { Technology } from '@/types/models'

// Define the props for the component
const props = defineProps<{
  technologies: Technology[]
}>()
</script>

<template>
  <ul class="technologies">
    <li
      v-for="technology in props.technologies"
      :key="technology.name"
      class="technologies-tag"
      :class="{ colored: technology.color }"
      :style="technology.color ? { '--tag-hue': technology.color } : undefined"
    >
      {{ technology.name }}
    </li>
  </ul>
</template>

<style scoped>
.technologies {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.technologies-tag {
  border-radius: 9999px;
  color: var(--color-primary);
  background-color: var(--color-item-asset);
  /* Transparent border keeps non-colored tags the same size as colored ones. */
  border: 1px solid transparent;
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.15rem 0.55rem;
}
/* Colored tags derive text/border/background from a single stored hue,
   mixed with the current theme tokens so contrast follows the theme. */
.technologies-tag.colored {
  /* Lean the text further toward --color-text (60/40) so even very dark brand
     hues (e.g. Django navy-green) stay legible, while vivid hues remain
     recognisable. Border/background keep the hue's identity. */
  color: color-mix(in srgb, var(--tag-hue) 60%, var(--color-text));
  border: 1px solid color-mix(in srgb, var(--tag-hue) 45%, transparent);
  /* Mix with the theme background (not --color-item-asset, which is already
     tinted by --color-primary) so the fill reads as the tag color itself. */
  background-color: color-mix(in srgb, var(--tag-hue) 16%, var(--color-background));
}
</style>
