<script setup lang="ts">
import type { Social, User } from '@/types/models'
import { computed, onMounted, ref } from 'vue'
import { track, trackOutbound } from '@/composables/useAnalytics'

// Define the props for the component
const props = defineProps<{
  user: User
}>()

// Developer information for the footer.
const developerName = 'Matthieu Freitag'
const developerLink = 'https://matthieu-freitag.com/'

// Reactive state object to store the current time.
const currentTime = ref({
  hours: '00',
  minutes: '00',
  seconds: '00'
})

// Reactive state flag to indicate if the user's email has been copied.
const hasCopiedEmail = ref(false)

// The current year retrieved on component mount.
const year = ref(new Date().getFullYear())

onMounted(() => {
  if (props.user.locale) {
    // Format options: render the clock in the owner's timezone when provided,
    // so visitors see the owner's local time (matching the location label) — not
    // their own. Empty/absent timezone falls back to the visitor's local time.
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
    if (props.user.timezone) {
      timeOptions.timeZone = props.user.timezone
    }
    // Starts an interval to update the current time every second.
    setInterval(() => {
      const now = new Date().toLocaleTimeString(props.user.locale, timeOptions).split(':')
      // Update time with leading zeros for formatting
      currentTime.value = {
        hours: now[0],
        minutes: now[1],
        seconds: now[2].split(' ')[0] // Split to remove AM/PM if present
      }
    }, 1000) // Update every second
  }
})

/**
 * Copy the owner's email to the user's clipboard.
 */
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(props.user.email)
    hasCopiedEmail.value = true
    track('email-copy') // custom umami event (no-op if analytics disabled)
    setTimeout(() => (hasCopiedEmail.value = false), 1000) // Reset after 1s
  } catch (error) {
    console.error('Failed to copy email:', error)
  }
}

/**
 * This computed property returns a filtered and sorted copy of the 'socials' prop.
 * Filters the socials based on their 'hidden' property.
 * Sorts the socials based on their 'index' property in ascending order.
 *
 * @returns {Social[]} A sorted copy of the socials.
 */
const prepareSocials = computed(() => {
  return props.user.socials
    .slice()
    .filter((i) => !i.hidden)
    .sort((a: Social, b: Social) => a.index - b.index)
})

defineExpose({
  currentTime,
  copyEmail,
  hasCopiedEmail
})
</script>

<template>
  <footer id="footer" class="section-container">
    <div class="container">
      <div>
        <h2>{{ user.footer.title }}</h2>
        <h3 class="text-alternative">{{ user.footer.subTitle }}</h3>
      </div>
      <div v-if="user.footer.showLocation" class="location">
        <p class="h4">{{ user.location }}</p>
        <div class="text-alternative">
          <p>{{ currentTime.hours }}</p>
          <span class="animate-1s-blink">:</span>
          <p>{{ currentTime.minutes }}</p>
          <span class="animate-1s-blink">:</span>
          <p>{{ currentTime.seconds }}</p>
        </div>
      </div>
      <div class="contact">
        <div class="email-container text-alternative" @click="copyEmail">
          <span v-if="!hasCopiedEmail" class="overline">Click to copy</span>
          <span v-else-if="hasCopiedEmail" class="overline copied">Copied!</span>
          <p class="h4 email">{{ user.email }}</p>
          <div class="email-underline bg-alternative"></div>
        </div>
      </div>
      <ul v-if="user.footer.showSocials" class="links">
        <li v-if="user.footer.showEmail">
          <a :href="'mailto:' + user.email" @click="track('email-click')">
            <p>Email me</p>
            <svg
              class="social-icon"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4995 13.5001L20.9995 3.00005M10.6271 13.8281L13.2552 20.5861C13.4867 21.1815 13.6025 21.4791 13.7693 21.566C13.9139 21.6414 14.0862 21.6415 14.2308 21.5663C14.3977 21.4796 14.5139 21.1821 14.7461 20.587L21.3364 3.69925C21.5461 3.16207 21.6509 2.89348 21.5935 2.72185C21.5437 2.5728 21.4268 2.45583 21.2777 2.40604C21.1061 2.34871 20.8375 2.45352 20.3003 2.66315L3.41258 9.25349C2.8175 9.48572 2.51997 9.60183 2.43326 9.76873C2.35809 9.91342 2.35819 10.0857 2.43353 10.2303C2.52043 10.3971 2.81811 10.5128 3.41345 10.7444L10.1715 13.3725C10.2923 13.4195 10.3527 13.443 10.4036 13.4793C10.4487 13.5114 10.4881 13.5509 10.5203 13.596C10.5566 13.6468 10.5801 13.7073 10.6271 13.8281Z"
                stroke="black"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </li>
        <li v-if="user.footer.showResume && user.resume">
          <a
            :href="user.resume.file"
            target="_blank"
            @click="trackOutbound(user.resume.file, 'resume')"
          >
            <p>My resume</p>
            <svg
              class="social-icon"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z"
                stroke="black"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </li>
        <li v-for="(social, index) in prepareSocials" :key="index">
          <a :href="social.url" target="_blank" @click="trackOutbound(social.url, 'social')">
            <div>
              <p>{{ social.name }}</p>
              <span v-if="social.pseudo" class="text-alternative">@{{ social.pseudo }}</span>
            </div>
            <!-- CSS mask: recolors any monochrome icon to the theme text color,
                 cross-origin safe (the media URL is absolute). Same technique as
                 the project link icons. -->
            <span
              class="social-icon social-icon-mask"
              :style="{ '--icon-url': `url('${social.image.file}')` }"
              role="img"
              :aria-label="social.name"
            />
          </a>
        </li>
      </ul>
      <div class="copyright caption">
        <p>Copyright © {{ year }} {{ user.name }}. All rights reserved.</p>
        <p class="text-alternative">
          Design &amp; Development by <a :href="developerLink">{{ developerName }}</a
          >.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.section-container {
  padding-bottom: 0.5rem;
}
footer {
  display: flex;
  justify-content: center;
  background: var(--color-background);
  background: linear-gradient(
    180deg,
    var(--color-background) 0%,
    color-mix(in srgb, var(--color-background), var(--color-primary) 15%) 100%
  );
}
.container {
  display: flex;
  flex-direction: column;
  row-gap: 3.5rem;
}
h2 {
  line-height: 100%;
}

.email-container {
  position: relative;
  display: inline-block;
}
.email-container:hover {
  cursor: pointer;
}
.email {
  text-decoration: none;
  color: var(--color-alternative);
}
.email-underline {
  width: 0;
  height: 2px;
  background-color: var(--color-alternative);
}
.email-container .email,
.email-container .email-underline {
  transition: all 0.3s ease-in-out;
}
.email-container:hover .email {
  color: var(--color-primary);
}
.email-container:hover .email-underline {
  width: 100%;
  background-color: var(--color-primary);
}

.copied {
  animation: copied-animation 1s ease-in-out;
}
@keyframes copied-animation {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.1);
  }
}

.location div {
  display: flex;
  line-height: 100%;
}

.links {
  display: flex;
  flex-direction: row;
  column-gap: 5%;
  justify-content: space-between;
  list-style: none;
  padding: 0;
}
.links li {
  flex: 1;
}
.links li a {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: var(--color-text);
  padding: 0.5rem 0;
  transition: all 0.3s ease-in-out;
  border: solid 2px transparent;
  border-top-color: var(--color-alternative);
}
.links a:hover {
  padding: 0.5rem 1rem;
  background-color: var(--color-item-bg-secondary);
  border-color: var(--color-item-asset);
  border-radius: 0.5rem;
}
.links .social-icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}
/* Inline SVG icons (email / resume) follow the theme text color. */
svg.social-icon {
  fill: currentColor;
}
/* Uploaded social icons: tinted to the theme text color via CSS mask. */
.social-icon-mask {
  background-color: currentColor;
  -webkit-mask: var(--icon-url) center / contain no-repeat;
  mask: var(--icon-url) center / contain no-repeat;
}

.copyright {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.copyright p {
  margin-right: 10px;
}
.copyright a,
.copyright a:-webkit-any-link {
  color: inherit;
}

@media (max-width: 1200px) {
  h1 {
    line-height: 120%;
  }
}

@media (max-width: 768px) {
  footer {
    row-gap: 2rem;
    text-align: center;
  }
  h1 {
    line-height: 100%;
  }
  h1 + h2 {
    margin-top: 1.5rem;
  }
  .location div {
    justify-content: center;
  }
  .links {
    flex-direction: column;
    max-width: 400px;
    width: 100%;
    align-self: center;
  }
  .links div {
    text-align: left;
  }
  .links a:hover {
    border-radius: 0;
  }
  .links li:hover + li a {
    border-top-color: transparent;
  }
  .copyright {
    flex-direction: column;
  }
}
</style>
