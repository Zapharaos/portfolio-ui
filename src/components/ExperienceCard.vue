<script setup lang="ts">
import type { Experience } from '@/types/models'
import TechnologiesList from '@/components/TechnologiesList.vue'

// Define the props for the component
const props = defineProps<{
  experience: Experience
  isActive: boolean
}>()

// Define emits options for custom events
const emit = defineEmits(['activate', 'collapse'])

/**
 * Handles the click event on the collapse button.
 *
 * @param event - The click event object.
 * @emits collapse - Emits the 'collapse' event if the content is currently expanded.
 */
function collapse(event: Event): void {
  if (props.isActive) {
    event.preventDefault()
    event.stopPropagation()
    emit('collapse');
  }
}
</script>

<template>
  <li class="item" :class="{ 'active': isActive }">
    <div class="item-header" @click="$emit('activate')">
      <div class="item-title">
        <h3>
          {{ experience.title }}
        </h3>
        <p class="grey-text">
          @ {{ experience.company }}
          <span v-html="experience.logo"/>
        </p>
      </div>
      <button @click="collapse">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="item-content">
      <div class="wrapper">
        <div class="inner">
          <div class="infos">
            <p v-if="experience.period">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>{{ experience.period }}
            </p>
            <p v-if="experience.location">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>{{ experience.location }}
            </p>
            <a v-if="experience.url" :href="experience.url" target="_blank">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>{{ experience.shortUrl ? experience.shortUrl : experience.url }}
            </a>
          </div>
          <p>{{ experience.description }}</p>
          <TechnologiesList :technologies="experience.technologies" class="animate-opacity"/>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
/* Containers */

.item, .item-content .inner {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.item {
  padding: 0.5rem 2rem;
}

/* Header */

.item-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-title {
  display: flex;
  align-items: center;
  gap: 0 1rem;
  flex-wrap: wrap;
}
.item-title p {
  font-size: 1.25rem;
  font-weight: 500;
}
.item-header button {
  color: orange;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  transition: all 0.25s linear;
}
.item-header button:hover {
  cursor: pointer;
}

/* Content */

.item-content {
  display: grid;
  grid-template-rows: 0fr;
}
.item-content * {
  overflow: hidden;
}
.infos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5rem;
}
.infos {
  align-items: center;
}
.infos p, .infos a {
  display: flex;
}
.infos svg {
  color: orange;
  width: 20px;
  margin-right: 10px;
}
.infos a {
  color: white;
  text-decoration: none;
}
.infos a:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* Animations */

.item {
  transition: gap 0.5s ease, padding 0.5s ease;
}
.item-header svg {
  transition: transform .5s ease;
}
.item-content {
  transition: grid-template-rows 0.5s ease, padding 0.5s ease;
}
.item .inner {
  transition: gap 0.5s ease;
}
.animate-opacity {
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* Active related style */

.item.active {
  gap: 1rem;
  padding: 1rem 2rem;
}
.item:not(.active):hover {
  cursor: pointer;
}
.active .item-header button:hover {
  background-color: #5D3F11;
}
.active .item-header svg {
  transform: rotate(calc(360deg + 180deg));
}
.item.active .item-content {
  grid-template-rows: 1fr;
}
.item.active .inner {
  gap: 1rem;
}
.item.active .animate-opacity {
  opacity: 1;
  transition: opacity 1.25s ease-in;
}

/* Responsive */

@media (max-width: 992px) {
  .infos {
    gap: 0;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .infos {
    gap: 0.5rem;
    flex-direction: column;
  }
  .infos p, .infos a {
    width: 100%;
  }
}
</style>