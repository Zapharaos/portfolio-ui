<template>
  <HeaderComponent/>
  <PortfolioComponent/>
  <FooterComponent/>
</template>

<script lang="ts">
import PortfolioComponent from '@/components/PortfolioComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    PortfolioComponent,
    HeaderComponent,
    FooterComponent,
  },
}
</script>
