import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router