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
  name: 'ListComponent',
  components: {
    ListElementTab,
    ListElementPanel
  }
}
</script>

<style>
.tabs {
  display: flex;
  flex-direction: row;
  width: 75%;
  margin: 0 auto;
  align-items: center;
  height: 100%;
  min-height: 300px;
}

.tablist {
  display: flex;
  flex-direction: column;
}

.tablist button {
  border: solid 3px var(--button-bg-color);
  border-radius: 0;
  transition: all ease-in-out 600ms;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: var(--button-bg-color);
  word-wrap: break-word;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.tablist button[aria-selected="true"]{
  border-color: var(--button-active-scd-hover-color);
  background-color: var(--button-active-scd-hover-color);
}

.panels h1 {
  margin-bottom: 0;
  color: var(--text-color);
}

.panels h4 {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--snd-text-color);
}

.panels h5 {
  margin-top: 0;
  margin-bottom: 0;
  color: var(--snd-text-color);
  display: flex;
  flex-direction: row;
}

.panels a {
  color: var(--main-color);
}

.panels .date {
  color: var(--main-color);
}

.panels .date + div p {
  text-align: justify;
  color: var(--text-color);
}

.panels ul li {
  color: var(--text-color);
}

.panels ul li small {
  color: var(--main-color);
  margin-left: 0.5em;
}

.hidden {
  opacity: 0 !important;
  height: 0 !important;
  overflow: hidden;
}

.panel {
  margin-left: 5%;
  height: auto;
  opacity: 1;
  transition: opacity ease-in-out 500ms;
}

@media screen and (min-width: 769px) {
  .tablist button {
    max-width: 350px;
    min-width: 250px;
  }

  .tablist button:hover, .tablist button[aria-selected="true"]{
    border-left-color: var(--main-color);
  }

}

@media screen and (max-width: 768px) {

  .tabs {
    display: flex;
    flex-direction: column;
    width: 75%;
    margin: 0 auto;
    align-items: center;
    height: 100%;
    min-height: 300px;
  }

  .tablist {
    margin-top: 10%;
    margin-bottom: 3%;
    width: 100%;
  }

  .tablist button {
    border-left: none;
    border-right: none;
    border-width: 1px;
  }

  .tablist button:hover, .tablist button[aria-selected="true"]{
    border-top-color: var(--main-color);
    border-bottom-color: var(--main-color);
  }

  .panel {
    margin-left: 0;
  }

}
</style>
