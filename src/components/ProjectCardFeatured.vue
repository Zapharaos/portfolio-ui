<script setup lang="ts">
import type { Project, ProjectLink } from '@/types/models'
import { computed } from 'vue'
import TechnologiesList from '@/components/TechnologiesList.vue'
import ProjectLinks from '@/components/ProjectLinks.vue'
import { trackOutbound } from '@/composables/useAnalytics'

const props = defineProps<{
  project: Project
}>()

/**
 * Links to display. Prefers the new `links` array; falls back to the legacy
 * `project.url` (as a single `website` link) during the backend transition.
 */
const resolvedLinks = computed<ProjectLink[]>(() => {
  if (props.project.links && props.project.links.length > 0) {
    return props.project.links
  }
  if (props.project.url) {
    return [{ kind: 'website', url: props.project.url, index: 0 }]
  }
  return []
})

/** First link → primary "Voir" CTA; the rest render as secondary link pills. */
const primaryLink = computed<ProjectLink | undefined>(() => resolvedLinks.value[0])
const secondaryLinks = computed<ProjectLink[]>(() => resolvedLinks.value.slice(1))
const primaryLabel = computed(() => primaryLink.value?.label?.trim() || 'Voir')

/** First letter, used as a placeholder icon when the project has no image. */
const initial = computed(() => props.project.title.charAt(0).toUpperCase())
</script>

<template>
  <li class="featured-card">
    <div class="card-head">
      <span class="app-icon-wrap">
        <span class="app-icon">
          <img v-if="project.image" :src="project.image.file" :alt="project.image.name" loading="lazy" />
          <span v-else class="app-icon-fallback">{{ initial }}</span>
        </span>
        <span
          v-if="project.healthUp"
          class="live-dot"
          role="img"
          aria-label="Service en ligne"
          title="Service en ligne"
        />
      </span>
      <div v-if="project.isNew || project.category" class="head-tags">
        <span v-if="project.isNew" class="new-pill">Nouveau</span>
        <span v-if="project.category" class="badge">{{ project.category }}</span>
      </div>
    </div>

    <h3 class="card-title">
      <span class="title-text" :title="project.title">{{ project.title }}</span>
    </h3>

    <p class="text description" v-html="project.description" />

    <p v-if="project.metric" class="metric">{{ project.metric }}</p>

    <TechnologiesList
      v-if="project.technologies && project.technologies.length"
      :technologies="project.technologies"
      class="tags"
    />

    <div v-if="resolvedLinks.length" class="cta-row">
      <a
        v-if="primaryLink"
        :href="primaryLink.url"
        target="_blank"
        rel="noopener"
        class="btn cta"
        @click="
          trackOutbound(primaryLink.url, 'project', {
            label: project.title,
            section: 'projects',
            kind: primaryLink.kind
          })
        "
      >
        {{ primaryLabel }} →
      </a>
      <ProjectLinks
        v-if="secondaryLinks.length"
        :links="secondaryLinks"
        :project-title="project.title"
        class="secondary-links"
      />
    </div>
  </li>
</template>

<style scoped>
.featured-card {
  /* Neutral surface (derived from the background, almost no primary tint) so the
     colored tags, icon and CTA read clearly. Theme accent is reserved for the
     CTA, hover border and Live/Nouveau. `--card-surface` is reused by the Live
     dot ring so it always matches the card. */
  --card-surface: color-mix(in srgb, var(--color-text) 4%, var(--color-background));
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--card-surface);
  border: solid 1px color-mix(in srgb, var(--color-text) 12%, transparent);
  border-radius: 14px;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}
.featured-card:hover {
  --card-surface: color-mix(in srgb, var(--color-text) 8%, var(--color-background));
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--color-primary) 45%, transparent);
}

.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.head-tags {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}
/* "Live" health indicator: an online-style dot straddling the icon corner.
   Shown only when healthUp === true. */
.app-icon-wrap {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.live-dot {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-primary);
  /* Ring in the card surface to separate the dot from the icon. */
  border: 2px solid var(--card-surface);
  animation: live-pulse 1.6s ease-in-out infinite;
}
@keyframes live-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.7);
  }
}
@media (prefers-reduced-motion: reduce) {
  .live-dot {
    animation: none;
  }
}

/* Filled accent pill — stands out against the outlined category badge. */
.new-pill {
  padding: 0.2rem 0.6rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-opposite);
  background-color: var(--color-primary);
  border-radius: 9999px;
  white-space: nowrap;
}
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 8px;
  border-radius: 14px;
  overflow: hidden;
  /* Neutral tile so transparent PNG logos read cleanly on any theme. */
  background-color: color-mix(in srgb, var(--color-text) 10%, var(--color-background));
  border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
  flex-shrink: 0;
}
.app-icon img {
  width: 100%;
  height: 100%;
  /* contain so logos are never cropped, whatever their aspect ratio. */
  object-fit: contain;
}
.app-icon-fallback {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}
.badge {
  padding: 0.2rem 0.6rem;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-alternative);
  border: 1px solid color-mix(in srgb, var(--color-item-asset) 70%, transparent);
  border-radius: 9999px;
  white-space: nowrap;
}

.card-title {
  margin: 0;
  line-height: 1.2;
}
.title-text {
  /* Cap long names at two lines with an ellipsis; break unbreakable words so
     they never overflow the card horizontally. */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: anywhere;
}

.description {
  /* Clamp long descriptions so cards stay balanced in the grid. */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: var(--color-alternative);
}
.metric {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-alternative);
}
.tags {
  margin-top: 0.25rem;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  /* Push the actions to the bottom so cards align in the grid. */
  margin-top: auto;
}
.cta {
  padding: 0.4rem 1.2rem;
  font-weight: 600;
  font-size: 0.85rem;
}
</style>
