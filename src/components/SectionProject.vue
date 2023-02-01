<template>
  <section id="section-project">
    <h3>Project</h3>
    <div class="tabs">
      <div role="tablist" class="tablist" aria-label="Project Tabs">
        <button role="tab" class="tab" data-head="project" aria-selected="true" aria-controls="project-panel-1" id="tab-1" tabindex="0">
          Carcassheim
        </button>
        <button role="tab" class="tab" data-head="project" aria-selected="false" aria-controls="project-panel-2" id="project-tab-2" tabindex="-1">
          Vaccinodrome
        </button>
        <button role="tab" class="tab" data-head="project" aria-selected="false" aria-controls="project-panel-3" id="project-tab-3" tabindex="-2">
          Cooking recipes
        </button>
        <button role="tab" class="tab" data-head="project" aria-selected="false" aria-controls="project-panel-4" id="project-tab-4" tabindex="-3">
          GPA Manager
        </button>
        <button role="tab" class="tab" data-head="project" aria-selected="false" aria-controls="project-panel-5" id="project-tab-5" tabindex="-4">
          Calculator
        </button>
      </div>
      <div class="panels" aria-label="Project Panels">
        <div id="project-panel-1" class="panel" data-body="project" tabindex="0" aria-labelledby="tab-1">
          <h1>Carcassheim</h1>
          <h5>Group of 14 people</h5>
          <p class="date">First semester of 2022</p>
          <div><p>As a group, we had to build a game from scratch. It was a real challenge in terms of project management and development, as I was the leader of the network and server teams. We mainly used C++ language. It was realized within the framework of a project in the fifth semester of my bachelor's degree (2022). Checkout the GitHub repository <a href="https://github.com/Projet-Integrateur-5B">here</a>.</p></div>
        </div>
        <div id="project-panel-2" class="panel hidden" data-body="project" tabindex="0" aria-labelledby="project-tab-2">
          <h1>Vaccinodrome</h1>
          <h5>Solo</h5>
          <p class="date">Second semester of 2021</p>
          <div><p>This is a simulation of a vaccinodrome with random doctors and patients. It was implemented using C, semaphores and shared memory. It was realized within the framework of a project in the fifth semester of my bachelor's degree (2021). Checkout the GitHub repository <a href="https://github.com/Zapharaos/vaccinodrome">here</a>.</p></div>
        </div>
        <div id="project-panel-3" class="panel hidden" data-body="project" tabindex="0" aria-labelledby="project-tab-3">
          <h1>Cooking recipes</h1>
          <h5>Solo</h5>
          <p class="date">Second semester of 2021</p>
          <div><p>This is a database using OracleDB for a cooking recipes website. I created it and inserted some data. Then I implemented it using some requests, functions, procedures, triggers and indexes. It was realized within the framework of a project in the fifth semester of my bachelor's degree (2021). Checkout the GitHub repository <a href="https://github.com/Zapharaos/ProjetBDD2">here</a>.</p></div>
        </div>
        <div id="project-panel-4" class="panel hidden" data-body="project" tabindex="0" aria-labelledby="project-tab-4">
          <h1>GPA Manager</h1>
          <h5>Duo</h5>
          <p class="date">Since september 2021</p>
          <div><p><a href="https://github.com/SchawnnDev">Paul MEYER</a> and I decided to build a website using Vue.js and Django to manage our grades and GPA. Paul did the frontend/backend, while I designed the website and sometimes updated the frontend.</p></div>
        </div>
        <div id="project-panel-5" class="panel hidden" data-body="project" tabindex="0" aria-labelledby="project-tab-5">
          <h1>Calculator</h1>
          <h5>Solo</h5>
          <p class="date">Second semester of 2019</p>
          <div><p>A basic calculator using MIPS Assembly. In addition to the basic operations, it is possible to perform operations such as logarithm, exponential, binary or hexadecimal conversions and binary multiplication. These operations can be performed in int, float or double. It was realized within the framework of a project in the third semester of my bachelor's degree (2019). Checkout the GitHub repository <a href="https://github.com/Zapharaos/Calculator-MIPS">here</a>.</p></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SectionProject',
  }
</script>
