<script setup lang="ts">
import type { Work } from '@/types/models'
import TechnologiesList from '@/components/TechnologiesList.vue'

// Define the props for the component
const props = defineProps<{
  work: Work
  isActive: boolean
}>()

</script>

<template>
  <li class="item" :class="{ 'active': isActive }">
    <div class="item-header">
      <div class="item-title">
        <h3>
          {{ work.title }}
        </h3>
        <p>
          @ {{ work.company }}
          <span v-html="work.logo"/>
        </p>
      </div>
      <p class="period">
        {{ work.period }}
      </p>
    </div>
    <div class="item-content">
      <div class="wrapper">
        <div class="inner">
          <p>{{ work.description }}</p>
          <TechnologiesList :technologies="work.technologies" />
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.item, .item-content .inner {
  display: flex;
  flex-direction: column;
}
.item.active, .item.active .inner {
  gap: 1rem;
}
.item {
  padding: 0.5rem 2rem;
}
.item.active {
  padding: 1rem 2rem;
}
.item:not(.active):hover {
  cursor: pointer;
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
.item-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s ease;
}
.item-content * {
  overflow: hidden;
}
.item.active .item-content {
  grid-template-rows: 1fr;
}
</style>