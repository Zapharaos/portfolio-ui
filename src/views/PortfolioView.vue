<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUserData } from '@/services/user'
import type { User } from '@/types/models'
import FooterComponent from "@/components/FooterComponent.vue";
import WorkComponent from "@/components/WorkComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

// Define reactive variables for component state
let user = ref<User | null>(null)
let loading = ref(true)
let error = ref<string | null>(null)

// Function to fetch user data and handle errors
async function fetchData() {
  try {
    user.value = await getUserData()
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
    <HeaderComponent
        :logo="user.logo"
    />
    <HeroComponent
        :hero="user.hero"
    />
    <AboutComponent
        :about="user.about"
    />
    <WorkComponent
        :work="user.work"
    />
    <FooterComponent
        :user="user"
    />

  </template>
  <LoaderComponent v-else-if="loading"/>
  <template v-else>
    <h1 class="center">Error while fetching data</h1>
  </template>
</template>

<style scoped>

</style>
