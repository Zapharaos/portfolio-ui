import { createMemoryHistory, createRouter } from 'vue-router'

import UserProfile from '@/components/UserProfile.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  { path: '/user', component: UserProfile },
  { path: '/:pathMatch(.*)', name: 'not-found', component: NotFound },  // Add the 404 route
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})