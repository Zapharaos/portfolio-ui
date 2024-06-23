import { createWebHistory, createRouter } from 'vue-router'

import UserProfile from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: UserProfile },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import( '@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router