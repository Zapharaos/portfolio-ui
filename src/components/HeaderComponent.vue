<script lang="ts">
export default {
  mounted() {
    const headerLinks = document.querySelectorAll('header a');
    headerLinks.forEach(link => {
      link.addEventListener('click', this.scrollToSection);
    });
  },
  methods: {
    scrollToSection(event: any) {
      event.preventDefault();
      const targetId = event.target.dataset.target; // Get the data-target ID
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },
};
</script>

<template>
  <header id="header">
    <nav>
      <a data-target="header">
        <img src="https://matthieu-freitag.com/img/nav-logo.png" alt="Logo"/>
      </a>
      <ul>
        <li>
          <a data-target="work">
            Work
          </a>
        </li>
        <li>
          <a data-target="about">
            About
          </a>
        </li>
        <li>
          <a data-target="footer">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  margin-bottom: 5svh;
}
nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: auto;
  left: 0;
  right: 0;
}
img {
  width: 25px;
}
ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}
li:not(:first-child) {
  margin-left: 10px;
}
</style>