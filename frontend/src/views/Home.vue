<template>
  <AppHeader/>
  <AppDashboard/>
  <AppFooter/>
  <AppNotification/>
  <div id="toPageTop">
    <a><i class="fas fa-angle-up"/></a>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppDashboard from '@/components/AppDashboard.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppNotification from '@/components/AppNotification.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppDashboard,
    AppFooter,
    AppNotification
  },
  mounted()
  {
    document.body.setAttribute('theme', 'dark');
  }
}
</script>

<style>
/* scroll-to-top */

#toPageTop {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 98;
  cursor: pointer;
}

#toPageTop.active {
  display: flex;
}

#toPageTop a {
  height: 39px;
  width: 37px;
  text-align: center;
  background: var(--main-scroll-button-color);
  display: block;
  border-radius: 3px;
}

#toPageTop a i{
  color: var(--text-color);
  font-size: 25px;
  line-height: 39px;
}
</style>