<script lang="ts">
export default {
  data() {
      return {
        name: 'Firstname Lastname',
        email: 'contact@example.com',
        location: 'City, Country',
        locale: 'fr-FR',
        socials: [
          {
            name: 'GitHub',
            url: 'https://github.com/',
            pseudo: 'Pseudo',
            svg: '<svg width="98" height="96" viewBox="0 0 98 96"  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/></svg>',
          },
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/',
            bis: '<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"/></svg>',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"\n' +
              'style="fill:#FFFFFF;">\n' +
              '    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>\n' +
              '</svg>',
          }
        ],
        currentTimeHours: '00',
        currentTimeMinutes: '00',
        currentTimeSeconds: '00',
        hasCopiedEmail: false,
      }
  },
  setup() {
    return {
      year: new Date().getFullYear(),
    };
  },
  mounted() {
    setInterval(() => {
      const now = new Date().toLocaleTimeString(this.locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const timeParts = now.split(':');
      this.currentTimeHours = timeParts[0];
      this.currentTimeMinutes = timeParts[1];
      this.currentTimeSeconds = timeParts[2].split(' ')[0]; // Split to remove AM/PM if present
    }, 1000); // Update every second
  },
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(this.email);
        this.hasCopiedEmail = true;
        setTimeout(() => (this.hasCopiedEmail = false), 1000); // Reset after 1s
      } catch (error) {
        console.error('Failed to copy email:', error);
      }
    },
  }
};
</script>

<template>
  <footer id="footer">
    <div>
      <h1>Interested in working together?</h1>
      <h2 class="grey-text">Let's build something impactful!</h2>
    </div>
    <div class="location">
      <p>{{ location }}</p>
      <div class="grey-text">
        <p>{{ currentTimeHours }}</p>
        <span class="animate-1s-blink">:</span>
        <p>{{ currentTimeMinutes }}</p>
        <span class="animate-1s-blink">:</span>
        <p>{{ currentTimeSeconds }}</p>
      </div>
    </div>
    <div class="contact">
      <div class="email-container grey-text" @click="copyEmail">
        <span v-if="!hasCopiedEmail">Click to copy</span>
        <span v-else-if="hasCopiedEmail" class="copied">Copied!</span>
        <p class="email">{{ email }}</p>
        <div class="email-underline grey-container"></div>
      </div>
    </div>
    <ul class="links">
      <li>
        <a href="mailto:{{ email }}">
          <p>Email me</p>
          <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64" width="64px" height="64px"><path d="M 32 6 A 26 26 0 0 0 10.429688 46.460938 L 8 58 L 20.59375 55.347656 A 26 26 0 0 0 32 58 A 26 26 0 0 0 32 6 z"/></svg>
        </a>
      </li>
      <li>
        <a href="#" target="_blank">
          <p>My resume</p>
          <svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 30.398438 2 L 7 2 L 7 48 L 43 48 L 43 14.601563 Z M 15 28 L 31 28 L 31 30 L 15 30 Z M 35 36 L 15 36 L 15 34 L 35 34 Z M 35 24 L 15 24 L 15 22 L 35 22 Z M 30 15 L 30 4.398438 L 40.601563 15 Z"/></svg>
        </a>
      </li>
      <li
        v-for="(social, index) in socials"
        :key="index"
      >
        <a :href="social.url" target="_blank">
          <div>
            <p>{{ social.name }}</p>
            <span v-if="social.pseudo" class="grey-text">@{{ social.pseudo }}</span>
          </div>
          <span v-html="social.svg" class="social-icon"></span>
        </a>
      </li>
    </ul>
    <div class="copyright">
      <p>Copyright © {{ year }} {{ name }}. All rights reserved.</p>
      <p class="grey-text">Design &amp; Development by {{ name }}</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  padding: 20px 5rem;
  margin-top: 5rem;
  color: white;
  display: flex;
  flex-direction: column;
  row-gap: 3.5rem;
}
h1 {
  font-size: 4.5rem;
}
h2 {
  font-size: 3rem;
  line-height: 100%;
}

.email-container {
  position: relative;
  display: inline-block;
}
.email-container:hover {
  cursor: pointer;
}
.email-container span {
  font-size: 12px;
  text-transform: uppercase;
}
.email {
  font-size: 2rem;
  text-decoration: none;
  line-height: 110%;
}
.email-container:hover .email-underline {
  width: 100%;
}
.email-underline {
  width: 0;
  height: 2px;
  transition: width 0.3s ease-in-out;
}

.copied {
  animation: copied-animation 1s ease-in-out; /* Add animation */
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

.location {
  font-size: 1.5rem;
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
  flex: 1; /* Makes each link item take up equal space */
}
.links li a {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 0.5rem 0;
  transition: all 0.3s ease-in-out;
  border: solid 1px transparent;
  border-top-color: white;
}
.links a:hover {
  padding: 0.5rem;
  background-color: gray;
  border-color: gray;
  border-radius: 0.5rem;
}
.links p {
  font-size: 1.2rem;
}
.links .social-icon {
  display: flex;
}
.links svg, .links :deep(svg) {
  width: 2rem;
  height: 2rem;
}

.copyright {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.copyright p {
  margin-right: 10px;
  font-size: 14px;
  font-weight: 200;
}

@media (max-width: 1200px) {
  h1 {
    font-size: 3.5rem;
    line-height: 120%;
  }
}

@media (max-width: 991px) {
  footer {
    padding: 20px 2rem;
  }
  h1 {
    font-size: 3rem;
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
  h2 {
    font-size: 2rem;
  }
  h1+h2 {
    margin-top: 1.5rem;
  }
  .location {
    font-size: 1.125rem;
  }
  .location div {
    justify-content: center;
  }
  .email {
    font-size: 1.25rem;
  }
  .email-container span {
    font-size: 10px;
  }
  .links {
    flex-direction: column;
  }
  .links div {
    text-align: left;
  }
  .links p {
    font-size: 1rem;
  }
  .links a:hover {
    border-radius: 0;
  }
  .copyright {
    flex-direction: column;
  }
}
</style>