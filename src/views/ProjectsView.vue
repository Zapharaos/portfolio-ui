<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getUserData } from '@/services/user'
import { getProjects, getProjectsHealth } from '@/services/projects'
import { useSeo } from '@/composables/useSeo'
import { applyTheme } from '@/composables/useTheme'
import type { Project, ProjectHealth, User } from '@/types/models'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ProjectCardFeatured from '@/components/ProjectCardFeatured.vue'
import LoaderComponent from '@/components/LoaderComponent.vue'

const user = ref<User | null>(null)
const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const { setUserSeo } = useSeo()

// Defensive client-side sort/filter (the API already orders and filters, but this
// keeps the view correct if the data source ever changes).
const visibleProjects = computed(() =>
  projects.value
    .slice()
    .filter((p) => !p.hidden)
    .sort((a, b) => a.index - b.index)
)

/** Merge health rows into the current projects list, matched by id. */
function mergeHealth(health: ProjectHealth[]) {
  const healthById = new Map(health.map((h) => [h.id, h]))
  projects.value = projects.value.map((project) => {
    const row = project.id != null ? healthById.get(project.id) : undefined
    return row ? { ...project, healthUp: row.healthUp, healthCheckedAt: row.healthCheckedAt } : project
  })
}

async function fetchData() {
  try {
    const [userData, projectsData] = await Promise.all([getUserData(), getProjects()])
    user.value = userData
    projects.value = projectsData
    setUserSeo(user.value)
    applyTheme(user.value.theme)
    // Health is a separate, dedicated call: fetch it after the content so it
    // never delays rendering. The Live badges fill in when it resolves. A
    // failure here is non-fatal — the page just shows no badges.
    getProjectsHealth()
      .then(mergeHealth)
      .catch(() => {})
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

defineExpose({
  loading,
  error,
  visibleProjects
})
</script>

<template>
  <template v-if="user">
    <HeaderComponent :logo="user.logo" />
    <main>
      <section class="container projects">
        <header class="projects-header">
          <h1 class="section-title">Projects</h1>
          <p class="text-alternative">A selection of things I've built.</p>
        </header>
        <ul v-if="visibleProjects.length" class="projects-grid">
          <ProjectCardFeatured
            v-for="project in visibleProjects"
            :key="project.index"
            :project="project"
          />
        </ul>
        <p v-else class="text-alternative empty">No projects to show yet.</p>
      </section>
    </main>
    <FooterComponent :user="user" />
  </template>
  <LoaderComponent v-else-if="loading" />
  <template v-else>
    <h1 class="center">Error while fetching data</h1>
  </template>
</template>

<style scoped>
main {
  width: 100%;
}
.projects {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  /* Clear the fixed header. */
  padding-top: 6rem;
  padding-bottom: 4rem;
}
.projects-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.projects-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  /* Two roomy columns on desktop; minmax(0,…) lets cards shrink without
     overflowing on long content. */
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}
@media (max-width: 700px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
.empty {
  padding: 2rem 0;
}
</style>
