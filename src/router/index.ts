import { createMemoryHistory, createRouter } from 'vue-router'

import UserProfile from '@/components/UserProfile.vue'

const routes = [
  { path: '/', component: UserProfile },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})