<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error loading user data.</div>
    <div v-if="user">
      <h2>{{ user.hero }}</h2>
      <p>{{ user.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { getUserData } from '@/services/user'
import type { User } from '@/types/models'

export default {
  name: 'PortfolioUser',
  setup() {
    const user = ref<User | null>(null)
    const loading = ref(true)
    const error = ref<string | null>(null)

    onMounted(async () => {
      try {
        user.value = await getUserData()
      } catch (err) {
        error.value = (err as Error).message
      } finally {
        loading.value = false
      }
    })

    return { user, loading, error }
  }
}
</script>
