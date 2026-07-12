<script setup lang="ts">
import type { ProjectLink } from '@/types/models'
import { trackOutbound } from '@/composables/useAnalytics'
import ProjectLinkIcon from '@/components/ProjectLinkIcon.vue'

const props = defineProps<{
  links: ProjectLink[]
  /** Title of the enclosing project — used for analytics. */
  projectTitle?: string
}>()

/** Neutral text shown only when a link has neither a label nor an icon. */
const FALLBACK_LABEL = 'View'

/**
 * Nothing is derived from `kind`: we show what was configured.
 *   - custom label set  → the label
 *   - no label + icon   → no text (the icon speaks for itself)
 *   - no label, no icon → a neutral "View" so the link is never empty
 */
const textFor = (link: ProjectLink): string => {
  const label = link.label?.trim()
  if (label) return label
  if (link.icon) return ''
  return FALLBACK_LABEL
}

/** Icon before the label unless explicitly set to 'after'. */
const iconBefore = (link: ProjectLink): boolean => link.iconPosition !== 'after'
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
        <!-- Icon only when configured (no default). Placed before/after per link. -->
        <ProjectLinkIcon v-if="link.icon && iconBefore(link)" :link="link" />
        <span v-if="textFor(link)">{{ textFor(link) }}</span>
        <ProjectLinkIcon v-if="link.icon && !iconBefore(link)" :link="link" />
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
</style>
