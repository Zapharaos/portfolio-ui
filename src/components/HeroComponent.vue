<script setup lang="ts">
const firstname = "Matthieu";
const lastname = "Freitag";
</script>

<template>
  <section id="hero">
    <h1 class="name">Hi, I'm {{ firstname }} {{ lastname }}</h1>
    <p class="tagline">I'm a <span>software engineer</span> passionate about crafting meaningful solutions to solve real-world challenges.</p>
    <a href="#work" class="call-to-action">Explore My Work</a>
    <img src="/src/assets/resize.png" alt="Logo" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  min-height: 100svh;
  width: 100%;
  padding: 10%;
  background: rgb(0,0,0);
  background: linear-gradient(150deg, rgba(0,0,0,1) 0%, rgba(72,72,72,1) 100%);
}

.name {
  color: white;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.1;
}

.tagline {
  font-size: 1rem;
  max-width: 50%;
}

span {
  color: orange;
  font-weight: bold;
}

.call-to-action {
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  width: fit-content;
  background-color: orange;
  color: black;
  border-radius: 0.5rem;
}

.call-to-action:hover {
  background-color: rgba(255, 255, 255, 100);
}

img {
  position: absolute;
  width: 30rem;
  right: 10%;
  bottom: 0;
  filter: drop-shadow(0px 0px 20px orange);
}
</style>
