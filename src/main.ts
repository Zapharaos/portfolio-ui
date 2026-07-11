import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import App from '@/App.vue'
import router from '@/router'
import { applyCachedTheme } from '@/composables/useTheme'

// Re-apply the last known theme before the app mounts (anti-FOUC).
applyCachedTheme()

createApp(App).use(createPinia()).use(router).use(createHead()).mount('#app')
