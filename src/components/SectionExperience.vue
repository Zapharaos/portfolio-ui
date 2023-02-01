<template>
  <section id="section-experience">
    <h3>Experience</h3>
    <div class="tabs">
      <div role="tablist" class="tablist" aria-label="Experience Tabs">
        <button role="tab" class="tab" data-head="experience" aria-selected="true" aria-controls="experience-panel-1" id="experience-tab-1" tabindex="0">
          CGI
        </button>
        <button role="tab" class="tab" data-head="experience" aria-selected="false" aria-controls="experience-panel-2" id="experience-tab-2" tabindex="-1">
          Kap Logistique
        </button>
        <button role="tab" class="tab" data-head="experience" aria-selected="false" aria-controls="experience-panel-3" id="experience-tab-3" tabindex="-2">
          Communauté des Communes
        </button>
        <button role="tab" class="tab" data-head="experience" aria-selected="false" aria-controls="experience-panel-4" id="experience-tab-4" tabindex="-3">
          SARL BTP La Fontaine
        </button>
        <button role="tab" class="tab" data-head="experience" aria-selected="false" aria-controls="experience-panel-5" id="experience-tab-5" tabindex="-4">
          Steelcase
        </button>
      </div>
      <div class="panels" aria-label="Experience Panels">
        <div id="experience-panel-1" class="panel" data-body="experience" tabindex="0" aria-labelledby="experience-tab-1">
          <h1>Consultant - Software engineer</h1>
          <h4>CGI</h4>
          <h5>Paris, France</h5>
          <p class="date">Since September 2022</p>
          <div><p>As part of my master's degree, I'm working as a consulting software engineer at the DGFiP which is part of the French Ministry of the Economy and Finance.</p></div>
        </div>
        <div id="experience-panel-2" class="panel hidden" data-body="experience" tabindex="0" aria-labelledby="experience-tab-2">
          <h1>Order picker</h1>
          <h4>Kap Logistique</h4>
          <h5>Molsheim, France</h5>
          <p class="date">March 2021 - July 2021</p>
          <div><p>Seasonal agent for a period of four months.</p></div>
        </div>
        <div id="experience-panel-3" class="panel hidden" data-body="experience" tabindex="0" aria-labelledby="experience-tab-3">
          <h1>Pool Technical Services Assistant</h1>
          <h4>Communauté des Communes</h4>
          <h5>Molsheim, France</h5>
          <p class="date">Summer 2019 & Summer 2020</p>
          <div><p>Seasonal agent for the summer periods of 2019 and 2020.</p></div>
        </div>
        <div id="experience-panel-4" class="panel hidden" data-body="experience" tabindex="0" aria-labelledby="experience-tab-4">
          <h1>Worker</h1>
          <h4>SARL BTP La Fontaine</h4>
          <h5>Mutzig, France</h5>
          <p class="date">July 2017</p>
          <div><p>Seasonal agent for a period of one month.</p></div>
        </div>
        <div id="experience-panel-5" class="panel hidden" data-body="experience" tabindex="0" aria-labelledby="experience-tab-5">
          <h1>Intern</h1>
          <h4>Steelcase</h4>
          <h5>Schiltigheim, France</h5>
          <p class="date">February 2016 - June 2016</p>
          <div><p>Steelcase recruited ten high school students to shadow and mentor them on a project for half a day each week. Of the ten participants, five were selected to travel to Steelcase headquarters in Grand Rapids, Michigan. We were able to introduce the project to local employees as well as to the other participating countries: Mexico, Romania and the United States.</p></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SectionExperience',
  }
</script>
