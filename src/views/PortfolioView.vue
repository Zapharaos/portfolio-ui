<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserData } from '@/services/user'
import type { User } from '@/types/models'
import PortfolioComponent from "@/components/PortfolioComponent.vue";

// Define reactive variables for component state
let user = ref<User | null>(null)
let loading = ref(true)
let error = ref<string | null>(null)

// Function to fetch user data and handle errors
async function fetchData() {
  try {
    user.value = await getUserData()
    console.log(user.value)
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

// Call fetchData on component mount
onMounted(fetchData)

defineExpose({
  loading,
  error
})
</script>

<template>
  <template v-if="user">
    <PortfolioComponent :user="user"/>
  </template>
  <template v-else>
    <h1>Error while fetching data</h1>
  </template>
</template>

<style scoped>

</style>
