<template>
  <footer>
    <a href="https://github.com/Zapharaos/portfolio">© {{ year }} - Designed & Built by Matthieu Freitag</a>
    <ul>
      <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
      <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
    </ul>
  </footer>
  <div id="top"><a><i class="fas fa-angle-up"></i></a></div>
  <div id="overlay"></div>
  <div id="notification">
    <div>
      <i class="fas fa-2x"></i>
      <p></p>
      <i id="close-notifications" class="fas fa-times"></i>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'
  export default {
    name: 'AppFooter',
    setup() {
      const year = computed(function () {
        return new Date().getFullYear();
      });
      return { year };
    }
  }
</script>
