<script setup lang="ts">
import type { ProjectLink } from '@/types/models'
import { trackOutbound } from '@/composables/useAnalytics'

const props = defineProps<{
  links: ProjectLink[]
  /** Title of the enclosing project — used for analytics. */
  projectTitle?: string
}>()

/** Neutral text shown only when a link has neither a label nor an icon. */
const FALLBACK_LABEL = 'Open'

/**
 * Nothing is derived from `kind`: we show what was configured.
 *   - custom label set  → the label
 *   - no label + icon   → no text (the image speaks for itself)
 *   - no label, no icon → a neutral fallback so the link is never empty
 */
const textFor = (link: ProjectLink): string => {
  const label = link.label?.trim()
  if (label) return label
  if (link.icon) return ''
  return FALLBACK_LABEL
}

/** True when neither a label nor an icon is configured → show the "open" hint. */
const isFallback = (link: ProjectLink): boolean => !link.icon && !link.label?.trim()

/**
 * SVG icon files are tinted with the link color (or theme text) via CSS `mask`,
 * so a monochrome glyph stays visible on any theme. Raster files (PNG, …) can't
 * be recolored, so they render as-is through a plain `<img>`.
 */
const isSvgIcon = (link: ProjectLink): boolean =>
  /\.svg(\?.*)?$/i.test(link.icon?.file ?? '')
</script>

<template>
  <ul class="project-links">
    <li v-for="link in props.links" :key="`${link.kind}-${link.index}`">
      <a
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="project-link"
        :class="{ colored: link.color }"
        :style="link.color ? { '--link-hue': link.color } : undefined"
        @click="trackOutbound(link.url, 'project', { label: projectTitle, kind: link.kind })"
      >
        <!-- Uploaded SVG → tinted via mask (follows the link/theme color). -->
        <span
          v-if="link.icon && isSvgIcon(link)"
          class="project-link-icon project-link-icon-mask"
          :style="{ '--icon-url': `url('${link.icon.file}')` }"
          role="img"
          :aria-label="link.icon.name"
        />
        <!-- Uploaded raster icon → shown as-is. -->
        <img
          v-else-if="link.icon"
          :src="link.icon.file"
          :alt="link.icon.name"
          class="project-link-icon project-link-icon-img"
          width="18"
          height="18"
        />
        <!-- No icon and no label → "open" arrow hint (same glyph as the card title). -->
        <svg
          v-else-if="isFallback(link)"
          xmlns="http://www.w3.org/2000/svg"
          class="project-link-icon project-link-icon-open"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
        </svg>
        <span v-if="textFor(link)">{{ textFor(link) }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.project-links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--color-primary) 45%, transparent);
  color: var(--color-primary);
  background-color: var(--color-item-asset);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  text-decoration: none;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}
.project-link:hover {
  background-color: color-mix(in srgb, var(--color-primary) 18%, var(--color-item-asset));
  border-color: var(--color-primary);
}
/* Colored links derive text/border/background from a single stored hue, mixed
   with the theme background so the fill reads as the link color (not the theme). */
.project-link.colored {
  color: color-mix(in srgb, var(--link-hue) 75%, var(--color-text));
  border: 1px solid color-mix(in srgb, var(--link-hue) 45%, transparent);
  background-color: color-mix(in srgb, var(--link-hue) 20%, var(--color-background));
}
.project-link.colored:hover {
  background-color: color-mix(in srgb, var(--link-hue) 32%, var(--color-background));
  border-color: color-mix(in srgb, var(--link-hue) 70%, transparent);
}
.project-link-icon {
  flex-shrink: 0;
}
/* Inline SVG (open hint) and masked file SVG follow the (possibly colored) text. */
.project-link-icon-open {
  fill: currentColor;
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
