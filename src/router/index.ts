import { createWebHistory, createRouter } from 'vue-router'

import PortfolioView from '@/views/PortfolioView.vue'

const routes = [
  { path: '/', name: 'PortfolioView', component: PortfolioView },
  // Dev-only helper route to render/capture the Open Graph image (see npm run og:generate).
  ...(import.meta.env.DEV
    ? [{ path: '/og', name: 'OgImage', component: () => import('@/views/OgView.vue') }]
    : []),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default routes && router