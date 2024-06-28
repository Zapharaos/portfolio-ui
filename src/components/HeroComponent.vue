<script setup lang="ts">
const firstname = "Matthieu";
const lastname = "Freitag";
const tagline = "I'm a <span style='color: orange;font-weight: bold'>software engineer</span> passionate about crafting meaningful<br>solutions to solve real-world challenges.";
</script>

<template>
  <section id="hero">
    <div class="hero-body">
      <h1 class="name">Hi, I'm {{ firstname }} {{ lastname }}</h1>
      <p class="tagline" v-html="tagline"></p>
      <a href="#work" class="call-to-action">
        <p>View my work</p>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6 6l6-6m-6-6l6 6"></path>
        </svg>
      </a>
    </div>
    <img src="" alt="Logo" />
  </section>
</template>

<style scoped>
section {
  min-height: 100svh;
  width: 100%;
  padding: 10% 10% 0;
  background: rgb(0,0,0);
  background: linear-gradient(150deg, rgba(0,0,0,1) 0%, rgba(72,72,72,1) 100%);
  clip-path: inset(0);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}

.hero-body {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  z-index: 2;
  align-self: flex-start;
}

.name {
  color: white;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 4rem;
  font-weight: 600;
  line-height: 1.1;
}

.tagline {
  font-size: 1.5rem;
}

.call-to-action {
  text-decoration: none;
  padding: 0.5rem 2rem;
  display: flex;
  transition: all 0.5s ease-in-out;
  width: fit-content;
  background-color: orange;
  color: black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  align-items: center;
  gap: 1rem;
}
svg {
  height: 1.5rem;
  width: auto;
  transform: rotate(90deg);
}

.call-to-action:hover {
  background-color: rgba(255, 255, 255, 100);
}

img {
  z-index: 0;
  filter: drop-shadow(0px 0px 20px orange);
  width: auto;
  height: max-content;
  align-self: flex-end;
  border-radius: 0;
  min-width: 30rem;
}

@media (max-width: 1500px) {
  section {
    flex-direction: column;
    justify-content: space-between;
  }
  img {
    min-width: 25rem;
  }
}

@media (max-width: 1200px) {
  section {
    padding-top: 15%;
  }
  .name {
    font-size: 3.5rem;
  }
  .tagline, .call-to-action {
    font-size: 1.25rem;
  }
}

@media (max-width: 991px) {
  section {
    padding-top: 20%;
  }
  .name {
    font-size: 3rem;
  }
  .tagline, .call-to-action {
    font-size: 1.125rem;
  }
  img {
    min-width: 20rem;
  }
}

@media (max-width: 768px) {
  section {
    text-align: center;
  }
  img {
    align-self: center;
    max-width: 75%;
  }
  .hero-body {
    align-items: center;
    gap: 3.5rem;
  }
}

@media (max-width: 576px) {
  img {
    min-width: 80%;
  }
}
</style>
