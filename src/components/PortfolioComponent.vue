<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import WorkComponent from "@/components/WorkComponent.vue";
import type {User} from "@/types/models";

// Define the props for the component
const props = defineProps<{
  user: User
}>()
</script>

<template>
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

<style scoped>

</style>