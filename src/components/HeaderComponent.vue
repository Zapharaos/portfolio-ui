<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FileType } from '@/types/models'
import { track } from '@/composables/useAnalytics'

// Define the props for the component
defineProps<{
  logo: FileType
}>()

const route = useRoute()
const router = useRouter()

const lastScrollTop = ref(0) // Tracks the last scroll position for header visibility
const showResponsiveMenu = ref(false) // Flag to indicate if responsive menu is open

onMounted(() => {
  // Add event listener for scroll events
  window.addEventListener('scroll', handleScroll)
})

/**
 * Prevents default link behavior and scrolls to the target section smoothly.
 * Also closes the responsive menu if it's open.
 *
 * @param id The element's id to head to.
 */
const scrollToSection = (id: string) => {
  // Track the internal navigation ('footer' is surfaced as 'contact' in the menu).
  track('nav', { to: id === 'footer' ? 'contact' : id })

  // Close responsive menu if it's open
  if (showResponsiveMenu.value) {
    toggleResponsiveMenu()
  }

  // Prefer the section on the *current* page (e.g. the footer exists on every
  // page, so Contact scrolls to the current footer). Only fall back to the home
  // page when the target isn't present here (e.g. Work/About from /projects).
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
    return
  }
  router.push({ path: '/', hash: `#${id}` })
}

/** Navigate to the dedicated projects page. */
const goToProjects = () => {
  track('nav', { to: 'projects' })
  if (showResponsiveMenu.value) {
    toggleResponsiveMenu()
  }
  router.push({ name: 'ProjectsView' })
}

/** Home link on the logo — navigates home (or scrolls to top if already there). */
const goHome = () => {
  if (showResponsiveMenu.value) {
    toggleResponsiveMenu()
  }
  if (route.name !== 'PortfolioView') {
    router.push({ path: '/' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

/**
 * Wraps a nav action so the links stay real anchors: modifier-clicks (ctrl/cmd/
 * shift/alt) and middle-clicks fall through to the browser (open in a new tab),
 * while a plain left-click runs the in-app action.
 */
const onNavClick = (event: MouseEvent, action: () => void) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  action()
}

/**
 * Handles scroll events to show/hide the header based on scroll direction.
 * Ignores scrolls while the responsive menu is active.
 */
const handleScroll = () => {
  // Ignore scrolls when responsive menu is active
  if (showResponsiveMenu.value) return

  // Get the current scroll position (credits: https://github.com/qeremy/so/blob/master/so.dom.js#L426)
  const st = document.documentElement.scrollTop

  const header = document.querySelector('header')
  // Check if there's a header element
  if (!header) {
    return
  }

  // Hide header on scroll down, show on scroll up
  if (st > lastScrollTop.value) {
    header.style.opacity = '0'
    header.style.visibility = 'hidden'
  } else if (st < lastScrollTop.value) {
    header.style.opacity = '1'
    header.style.visibility = 'visible'
  }

  // Reset lastScrollTop for mobile or negative scrolling scenarios
  lastScrollTop.value = st <= 0 ? 0 : st
}

/**
 * Toggles the visibility of the responsive menu and applies necessary style changes.
 */
const toggleResponsiveMenu = () => {
  // Toggle the responsive menu state
  showResponsiveMenu.value = !showResponsiveMenu.value

  // Toggle display class on menu SVGs
  document.querySelectorAll('.responsive-menu-svg').forEach((svg) => {
    svg.classList.toggle('display')
  })

  // Toggle display class for the menu list
  document.querySelector('ul')?.classList.toggle('display')

  // Toggle body class to disable/enable scroll while menu is open
  document.body.classList.toggle('responsive-menu')
}

defineExpose({
  lastScrollTop,
  showResponsiveMenu,
  scrollToSection,
  goToProjects,
  goHome,
  onNavClick,
  handleScroll,
  toggleResponsiveMenu
})
</script>

<template>
  <header>
    <div class="section-container">
      <nav class="container">
        <a class="logo" href="/" @click="onNavClick($event, goHome)">
          <span class="tinted logo-img" :style="{ '--icon': `url('${logo.file}')` }">
            <img :src="logo.file" :alt="logo.name" aria-hidden="true" />
          </span>
        </a>
        <button aria-label="menu" class="responsive-menu-btn" @click="toggleResponsiveMenu">
          <svg
            class="responsive-menu-svg display"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path
              d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"
            />
          </svg>
          <svg
            class="responsive-menu-svg close-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <path
              d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
            />
          </svg>
        </button>
        <ul>
          <li>
            <a class="nav-item-link" href="/" @click="onNavClick($event, goHome)"> Home </a>
          </li>
          <li>
            <a class="nav-item-link" href="/projects" @click="onNavClick($event, goToProjects)">
              Projects
            </a>
          </li>
          <li>
            <a
              class="nav-item-link"
              href="#footer"
              @click="onNavClick($event, () => scrollToSection('footer'))"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  transition: all 0.9s cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: transparent;

  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: auto;
  left: 0;
  right: 0;
  background-image: linear-gradient(
    0deg,
    rgb(from var(--color-background) r g b / 0%) 0%,
    rgb(from var(--color-background) r g b / 100%)
  );
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
  text-decoration: none;
}
.logo-img > img {
  height: 1.5rem;
  width: auto;
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
  /* Reset the browser's default link styling (real hrefs = new-tab support). */
  color: var(--color-text);
  text-decoration: none;
  transition: opacity 0.9s cubic-bezier(0.215, 0.61, 0.355, 1);
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
