<script setup lang="ts">
// Define the props for the component
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <section id="about">
    <h2>About me</h2>
    <div class="grid-container">
      <img class="manga" src="/src/assets/file.png" alt="manga"/>
      <p>
        {{ text }}
      </p>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 3rem
}
.grid-container {
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
}
.manga {
  border: solid 0.25rem white;
  border-radius: 1rem;
  width: inherit;
}
p {
  color: white;
  font-size: 1.125rem;
  text-align: justify;
  align-self: center;
}
</style>