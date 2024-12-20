<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {FileType} from "@/types/models";
import ThemeToggler from "@/components/ThemeToggler.vue";
import { useThemeStore } from '@/stores/theme'

// Define the props for the component
const props = defineProps<{
  logo: FileType
}>()

const themeStore = useThemeStore();

const lastScrollTop = ref(0); // Tracks the last scroll position for header visibility
const showResponsiveMenu = ref(false); // Flag to indicate if responsive menu is open

onMounted(() => {
  // Add event listener for scroll events
  window.addEventListener('scroll', handleScroll);
})

/**
 * Prevents default link behavior and scrolls to the target section smoothly.
 * Also closes the responsive menu if it's open.
 *
 * @param id The element's id to head to.
 */
const scrollToSection = (id: string) => {
  // Close responsive menu if it's open
  if (showResponsiveMenu.value) {
    toggleResponsiveMenu();
  }

  // Scroll to the target section smoothly
  document.getElementById(id as string)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Handles scroll events to show/hide the header based on scroll direction.
 * Ignores scrolls while the responsive menu is active.
 */
const handleScroll = () => {
  // Ignore scrolls when responsive menu is active
  if(showResponsiveMenu.value) return;

  // Get the current scroll position (credits: https://github.com/qeremy/so/blob/master/so.dom.js#L426)
  const st = document.documentElement.scrollTop;

  const header = document.querySelector('header');
  // Check if there's a header element
  if (!header) {
    return;
  }

  // Hide header on scroll down, show on scroll up
  if (st > lastScrollTop.value) {
    header.style.opacity = "0";
    header.style.visibility = "hidden";
  } else if (st < lastScrollTop.value) {
    header.style.opacity = "1";
    header.style.visibility = "visible";
  }

  // Reset lastScrollTop for mobile or negative scrolling scenarios
  lastScrollTop.value = st <= 0 ? 0 : st;
}

/**
 * Toggles the visibility of the responsive menu and applies necessary style changes.
 */
const toggleResponsiveMenu = () => {
  // Toggle the responsive menu state
  showResponsiveMenu.value = !showResponsiveMenu.value;

  // Toggle display class on menu SVGs
  document.querySelectorAll('.responsive-menu-svg').forEach(svg => {
    svg.classList.toggle('display');
  });

  // Toggle display class for the menu list
  document.querySelector('ul')?.classList.toggle('display');

  // Toggle body class to disable/enable scroll while menu is open
  document.body.classList.toggle('responsive-menu');
}

defineExpose({
  lastScrollTop,
  showResponsiveMenu,
  scrollToSection,
  handleScroll,
  toggleResponsiveMenu,
})
</script>

<template>
  <header>
    <div class="section-container">
      <nav class="container">
        <a class="logo">
          <img :src="logo.file" :alt="logo.name" class="social-icon"/>
        </a>
        <button aria-label="menu" class="responsive-menu-btn" @click="toggleResponsiveMenu">
          <svg class="responsive-menu-svg display" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"/></svg>
          <svg class="responsive-menu-svg close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
        </button>
        <ul>
          <li>
            <a class="nav-item-link" @click="scrollToSection('work')">
              Work
            </a>
          </li>
          <li>
            <a class="nav-item-link" @click="scrollToSection('about')">
              About
            </a>
          </li>
          <li>
            <a class="nav-item-link" @click="scrollToSection('footer')">
              Contact
            </a>
          </li>
          <li v-if="!themeStore.hasSingleTheme">
            <ThemeToggler/>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  transition: all .9s cubic-bezier(.215,.61,.355,1);
  background-color: transparent;

  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: auto;
  left: 0;
  right: 0;
  background-image: linear-gradient(0deg, rgb(from var(--color-background) r g b / 0%) 0%, rgb(from var(--color-background) r g b / 100%));
}
.section-container {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
}
.logo {
  display: flex;
  align-items: center;
  z-index: 9999;
}
.logo img {
  height: 1.5rem;
  filter: var(--filter-img-color);
}
ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}
li:not(:first-child) {
  margin-left: 2rem;
}
li:last-child {
  display: flex;
  justify-content: center;
}
li a {
  transition: opacity .9s cubic-bezier(.215,.61,.355,1);
}
li a:hover {
  color: var(--color-header-hover);
}
a:hover {
  cursor: pointer;
}
.nav-item-link {
  font-size: 24px;
  letter-spacing: 0.25px;
  font-weight: 500;
}
</style>

<style scoped>
/* Responsive styles */
.responsive-menu-btn {
  background: unset;
  color: unset;
  pointer-events: auto;
  display: none;
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  z-index: 9999;
  cursor: pointer;
}
svg {
  visibility: hidden;
  color: var(--color-text);
  stroke: var(--color-text);
  fill: var(--color-text);
  scale: 0;
  transition: all 0.3s ease-in-out;
  width: 24px;
  height: 24px;
}
.responsive-menu-btn svg:not(:first-child) {
  position: absolute;
  top: 0;
  left: 0;
}
.display {
  visibility: inherit;
  opacity: 1;
}
svg.display {
  transition-delay: 0.2s;
  scale: initial;
}
@media only screen and (max-width: 768px) {
  .responsive-menu-btn {
    display: flex;
  }
  ul {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-height: 100svh;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    flex-direction: column;
    padding: 3rem 1rem;
    grid-gap: unset;
    overflow-y: auto;
    visibility: hidden;
    opacity: 0;
    background: var(--color-background);
  }
  ul li {
    margin: 0 !important;
    text-align: center;
  }
  .nav-item-link {
    font-size: 61px;
    letter-spacing: -0.5px;
    font-weight: 600;
  }
}
</style>