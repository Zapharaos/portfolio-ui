<template>
  <footer>
    <a href="https://github.com/Zapharaos/portfolio">© {{ year }} - Designed & Built by Matthieu Freitag</a>
    <ul> <!-- TODO : list of socials from DB -->
      <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
      <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
    </ul>
  </footer>
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

<style>
footer {
  margin-top: 10%;
  padding: 20px;
  background-color: var(--main-color);
  text-align: center;
}

footer a {
  text-decoration: none;
  color: var(--footer-color);
}

footer a:hover {
  text-decoration: underline;
}

footer ul {
  list-style: none;
  margin: 20px auto 0 auto;
  padding: 0;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

footer li a {
  text-transform: uppercase;
  font-weight: bold;
}

footer li a:hover {
  color: var(--footer-hover-color);
  transition: all ease-in-out 500ms;
}

footer li a:focus {
  outline: none;
}

@media screen and (max-width: 320px) {

  footer ul {
    width: auto;
  }
}
</style>