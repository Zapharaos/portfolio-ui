<script setup lang="ts">
// Define the props for the component
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <section id="about">
    <h2>About</h2>
    <div class="grid-container">
      <img src="https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/3fe7179168b3c54c5dd0df0242cc768e-1715191693/29743EA8-4F38-43BB-9330-2392FB07F086/draw-you-in-the-jujutsu-kaisen-manga-artstyle.png" alt="about image"/>
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
img {
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
@media (max-width: 992px) {
  .grid-container {
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;
    align-items: center;
  }
  img {
    width: auto;
    max-width: 350px;
  }
}
</style>