<script setup lang="ts">

import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <!--  Credits : https://web.dev/patterns/theming/theme-switch?hl=fr#js-->
  <button @click="themeStore.toggleTheme()" class="theme-toggle" title="Toggles light & dark" aria-label="auto" aria-live="polite">
    <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
      <mask class="moon" id="moon-mask">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx="24" cy="10" r="6" fill="black" />
      </mask>
      <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" />
      <g class="sun-beams">
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </svg>
  </button>
</template>

<style scoped>
/* Button */
button {
  background: transparent;
  border: none;
}
button:hover {
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  svg {
    width: 48px;
    height: 48px;
  }
}

/* Credits : https://web.dev/patterns/theming/theme-switch?hl=fr#js */
.sun-and-moon > :is(.moon, .sun, .sun-beams) {
  transform-origin: center;
}

.sun-and-moon > :is(.moon, .sun) {
  fill: var(--color-text);
}

.theme-toggle:is(:hover) > .sun-and-moon > :is(.moon, .sun) {
  fill: var(--color-header-hover);
}

.sun-and-moon > .sun-beams {
  stroke: var(--color-text);
  stroke-width: 2px;
}

.theme-toggle:is(:hover) .sun-and-moon > .sun-beams {
  stroke: var(--color-header-hover);
}

html:not(.light) .sun-and-moon > .sun {
  transform: scale(1.75);
}

html:not(.light) .sun-and-moon > .sun-beams {
  opacity: 0;
}

html:not(.light) .sun-and-moon > .moon > circle {
  transform: translateX(-7px);
}

@supports (cx: 1) {
  html:not(.light) .sun-and-moon > .moon > circle {
    cx: 17;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .sun-and-moon > .sun {
    transition: transform .5s cubic-bezier(.5,1.25,.75,1.25);
  }

  .sun-and-moon > .sun-beams {
    transition: transform .5s cubic-bezier(.5,1.5,.75,1.25), opacity .5s cubic-bezier(.25,0,.3,1);
  }

  .sun-and-moon .moon > circle {
    transition: transform .25s cubic-bezier(0,0,0,1);
  }

  @supports (cx: 1) {
    .sun-and-moon .moon > circle {
      transition: cx .25s cubic-bezier(0,0,0,1);
    }
  }

  html:not(.light) .sun-and-moon > .sun {
    transition-timing-function: cubic-bezier(.25,0,.3,1);
    transition-duration: .25s;
    transform: scale(1.75);
  }

  html:not(.light) .sun-and-moon > .sun-beams {
    transition-duration: .15s;
    transform: rotateZ(-25deg);
  }

  html:not(.light) .sun-and-moon > .moon > circle {
    transition-duration: .5s;
    transition-delay: .25s;
  }
}

</style>