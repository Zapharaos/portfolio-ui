import { createWebHistory, createRouter } from 'vue-router'

import PortfolioView from '@/views/PortfolioView.vue'

const routes = [
  { path: '/', name: 'PortfolioView', component: PortfolioView },
  { path: '/projects', name: 'ProjectsView', component: () => import('@/views/ProjectsView.vue') },
  // Dev-only helper route to render/capture the Open Graph image (see npm run og:generate).
  ...(import.meta.env.DEV
    ? [{ path: '/og', name: 'OgImage', component: () => import('@/views/OgView.vue') }]
    : []),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
]

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Smooth-scroll to a hash target (used for cross-page section links, e.g. from
  // /projects back to /#work). Same-page anchor clicks handle their own scroll.
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (UTM_PARAMS.some((p) => p in to.query)) {
    const cleanQuery = Object.fromEntries(
      Object.entries(to.query).filter(([key]) => !UTM_PARAMS.includes(key))
    )
    router.replace({ ...to, query: cleanQuery })
  }
})

export default routes && router
