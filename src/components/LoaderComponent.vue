<script setup lang="ts">

</script>

<template>
  <div class="loader-container">
    <div class="loader-spinner"/>
    <img src="/src/assets/logo.png" alt="logo loader" class="logo-loader"/>
  </div>
</template>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.loader-spinner {
  width: var(--loader-spinner-width);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
      radial-gradient(farthest-side,var(--color-primary) 94%, var(--color-background)) top/8px 8px no-repeat,
      conic-gradient(var(--color-background) 30%, var(--color-primary));
  mask: radial-gradient(farthest-side,var(--color-rgba-0-background) calc(100% - 8px), var(--color-background) 0);
  animation: loader-spinner 1s infinite linear;
}
@keyframes loader-spinner{
  100%{transform: rotate(1turn)}
}

.logo-loader {
  max-width: calc(var(--loader-spinner-width)/2);
  position: absolute;
  animation: logo-loader 1s infinite alternate ease-in-out;
}
@keyframes logo-loader {
  from { transform: scale(1); }  /* Start at original size */
  to { transform: scale(1.1); }  /* Scale up to 110% */
}
</style>