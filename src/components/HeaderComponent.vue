<script lang="ts">
let lastScrollTop = 0;
export default {
  mounted() {
    const headerLinks = document.querySelectorAll('header a');
    headerLinks.forEach(link => {
      link.addEventListener('click', this.scrollToSection);
    });
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    scrollToSection(event: any) {
      event.preventDefault();
      const targetId = event.target.dataset.target; // Get the data-target ID
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    handleScroll() {
      const header = document.querySelector('header');
      const st = document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (!header) {
        return;
      } else if (st > lastScrollTop) {
        header.style.opacity = "0";
        header.style.visibility = "hidden";
      } else if (st < lastScrollTop) {
        header.style.opacity = "1";
        header.style.visibility = "visible";
      } // else was horizontal scroll
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }
  },
};
</script>

<template>
  <header id="header">
    <nav>
      <a class="logo">
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
  margin-bottom: 10svh;
  color: white;
  font-size: 1.5rem;
  width: 100%;
  transition: all .9s cubic-bezier(.215,.61,.355,1);
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 3rem;
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: auto;
  left: 0;
  right: 0;
}
.logo {
  display: flex;
  align-items: center;
}
.logo img {
  height: 1.5rem;
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
li a {
  transition: opacity .9s cubic-bezier(.215,.61,.355,1);
}
li a:hover {
  opacity: 0.4;
}
a:hover {
  cursor: pointer;
}
@media (max-width: 768px) {
  header {
    font-size: 1.25rem;
  }
  nav {
    padding: 1rem 2rem;
  }
  li:not(:first-child) {
    margin-left: 1.5rem;
  }
}
@media (max-width: 576px) {
  header {
    font-size: 1.125rem;
  }
  nav {
    padding: 1rem 1.5rem;
  }
  li:not(:first-child) {
    margin-left: 1.25rem;
  }
}
</style>