<script setup lang="ts">
import type { Work } from '@/types/models'
import TechnologiesList from '@/components/TechnologiesList.vue'

// Define the props for the component
const props = defineProps<{
  work: Work
}>()
</script>

<template>
  <li class="item">
    <div class="item-header">
      <div class="item-title">
        <h3>
          {{ props.work.title }}
        </h3>
        <p>
          @ {{ props.work.company }}
          <span v-html="props.work.logo"/>
        </p>
      </div>
      <p class="period">
        {{ props.work.period }}
      </p>
    </div>
    <div class="item-content">
      <p>{{ props.work.description }}</p>
      <TechnologiesList :technologies="props.work.technologies" />
    </div>
  </li>
</template>

<style scoped>
.item, .item-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.item-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>