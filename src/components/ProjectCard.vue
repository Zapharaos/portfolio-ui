<script setup lang="ts">
import type { Project, ProjectLink } from '@/types/models'
import { computed } from 'vue'
import TechnologiesList from '@/components/TechnologiesList.vue'
import ProjectLinks from '@/components/ProjectLinks.vue'
import { trackOutbound } from '@/composables/useAnalytics'

// Define the props for the component
const props = defineProps<{
  project: Project
  /** Title of the enclosing section (e.g. "Projects") — used for analytics. */
  section?: string
}>()

/**
 * Links to display. Prefers the new `links` array; falls back to the legacy
 * `project.url` (as a single `website` link) during the backend transition.
 * Remove the fallback once `Project.url` is dropped from the API.
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

/** First link acts as the "primary" one the title points to. */
const primaryLink = computed<ProjectLink | undefined>(() => resolvedLinks.value[0])
</script>

<template>
  <li>
    <article class="item project-card">
      <h3 class="card-title">
        <a
          v-if="primaryLink"
          :href="primaryLink.url"
          target="_blank"
          rel="noopener"
          class="card-title-link clickable"
          @click="
            trackOutbound(primaryLink.url, 'project', {
              label: project.title,
              section,
              kind: primaryLink.kind
            })
          "
        >
          {{ project.title }}
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" class="link-open" width="24" height="24">
              <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
            </svg>
          </span>
        </a>
        <template v-else>{{ project.title }}</template>
      </h3>
      <div v-if="project.image" class="image-container">
        <img :src="project.image.file" :alt="project.image.name" />
      </div>
      <p class="text" v-html="project.description" />
      <TechnologiesList v-if="project.technologies" :technologies="project.technologies" />
      <ProjectLinks
        v-if="resolvedLinks.length"
        :links="resolvedLinks"
        :project-title="project.title"
      />
    </article>
  </li>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.card-title-link {
  color: inherit;
  text-decoration: none;
}
</style>
