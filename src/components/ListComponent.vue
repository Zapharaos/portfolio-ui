<template>

  <section id="section-experience">
    <h3>Name</h3>
    <div class="tabs">
      <div role="tablist" class="tablist" aria-label="Name Tabs">
        <list-element-tab/>
      </div>
      <div class="panels" aria-label="Name Panels">
        <list-element-panel/>
      </div>
    </div>
  </section>

</template>

<script>
import ListElementTab from '@/components/ListElementTab.vue'
import ListElementPanel from '@/components/ListElementPanel.vue'

export default {
  name: 'TabList',
  components: {
    ListElementTab,
    ListElementPanel
  }
}
</script>
