import { createWebHistory, createRouter } from 'vue-router'

import PortfolioView from '@/views/PortfolioView.vue'

const routes = [
  { path: '/', name: 'PortfolioView', component: PortfolioView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router