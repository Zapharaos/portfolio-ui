<script setup lang="ts">
import type {Social, User} from "@/types/models";
import {computed, onMounted, ref} from "vue";
import svgMessage from "@/assets/message.svg"
import svgDocument from "@/assets/document.svg"

// Define the props for the component
const props = defineProps<{
  user: User
}>()

// Developer information for the footer.
const developerName = 'Matthieu Freitag';
const developerLink = 'https://matthieu-freitag.com/';

// Reactive state object to store the current time.
const currentTime = ref({
  hours: '00',
  minutes: '00',
  seconds: '00',
});

// Reactive state flag to indicate if the user's email has been copied.
const hasCopiedEmail = ref(false);

// The current year retrieved on component mount.
const year = ref(new Date().getFullYear());

onMounted(() => {
  if (props.user.locale) {
    // Starts an interval to update the current time every second.
    setInterval(() => {
      const now = new Date().toLocaleTimeString(props.user.locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).split(':');
      // Update time with leading zeros for formatting
      currentTime.value = {
        hours: now[0],
        minutes: now[1],
        seconds: now[2].split(' ')[0], // Split to remove AM/PM if present
      };
    }, 1000); // Update every second
  }
});

/**
 * Copy the owner's email to the user's clipboard.
 */
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(props.user.email);
    hasCopiedEmail.value = true;
    setTimeout(() => (hasCopiedEmail.value = false), 1000); // Reset after 1s
  } catch (error) {
    console.error('Failed to copy email:', error);
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
  return props.user.socials.slice()
      .filter(i => !i.hidden)
      .sort((a: Social, b: Social) => a.index - b.index);
});

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
          <a :href="'mailto:'+user.email">
            <p>Email me</p>
            <img :src="svgMessage" alt="Email icon" class="social-icon">
          </a>
        </li>
        <li v-if="user.footer.showResume && user.resume">
          <a :href="user.resume.file" target="_blank">
            <p>My resume</p>
            <img :src="svgDocument" alt="Resume icon" class="social-icon">
          </a>
        </li>
        <li
            v-for="(social, index) in prepareSocials"
            :key="index"
        >
          <a :href="social.url" target="_blank">
            <div>
              <p>{{ social.name }}</p>
              <span v-if="social.pseudo" class="text-alternative">@{{ social.pseudo }}</span>
            </div>
            <img :src="social.image.file" :alt="social.image.name" class="social-icon"/>
          </a>
        </li>
      </ul>
      <div class="copyright caption">
        <p>Copyright © {{ year }} {{ user.name }}. All rights reserved.</p>
        <p class="text-alternative">Design &amp; Development by <a :href="developerLink">{{ developerName }}</a>.</p>
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
  background: linear-gradient(180deg, var(--color-background) 0%, color-mix(in srgb, var(--color-background), var(--color-primary) 15%) 100%);
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
.email-container .email, .email-container .email-underline {
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
  display: flex;
  width: 2rem;
  height: 2rem;
  filter: var(--filter-img-color);
}

.copyright {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.copyright p {
  margin-right: 10px;
}
.copyright a, .copyright a:-webkit-any-link {
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
  h1+h2 {
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