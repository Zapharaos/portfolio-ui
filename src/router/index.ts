import { createWebHistory, createRouter } from 'vue-router'

import PortfolioView from '@/views/PortfolioView.vue'

const routes = [
  { path: '/', name: 'PortfolioView', component: PortfolioView },
  // Dev-only helper route to render/capture the Open Graph image (see npm run og:generate).
  ...(import.meta.env.DEV
    ? [{ path: '/og', name: 'OgImage', component: () => import('@/views/OgView.vue') }]
    : []),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
]

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

const router = createRouter({
  history: createWebHistory(),
  routes
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
