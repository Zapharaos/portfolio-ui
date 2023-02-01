<template>
  <app-header/>
  <app-dashboard/>
  <app-footer/>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppDashboard from '@/components/AppDashboard.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppDashboard,
    AppFooter
  }
}
</script>
