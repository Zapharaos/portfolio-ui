<script lang="ts">
export default {
  setup() {
    const year = new Date().getFullYear();
    return {
      year,
    };
  },
};
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ year }} My Company</p>
      <a href="mailto:info@mycompany.com">info@mycompany.com</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.footer-content {
}
</style>