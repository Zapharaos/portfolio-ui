<template>
  <section id="section-formation">
    <h3>Formation</h3>
    <div class="tabs">
      <div role="tablist" class="tablist" aria-label="Formation Tabs">
        <button role="tab" class="tab" data-head="formation" aria-selected="true" aria-controls="formation-panel-1" id="formation-tab-1" tabindex="0">
          Master's degree
        </button>
        <button role="tab" class="tab" data-head="formation" aria-selected="false" aria-controls="formation-panel-2" id="formation-tab-2" tabindex="-1">
          Bachelor's degree
        </button>
        <button role="tab" class="tab" data-head="formation" aria-selected="false" aria-controls="formation-panel-3" id="formation-tab-3" tabindex="-2">
          Baccalauréat
        </button>
        <button role="tab" class="tab" data-head="formation" aria-selected="false" aria-controls="formation-panel-4" id="formation-tab-4" tabindex="-3">
          Others
        </button>
      </div>
      <div class="panels" aria-label="Formation Panels">
        <div id="formation-panel-1" class="panel" data-body="formation" tabindex="0" aria-labelledby="formation-tab-1">
          <h1>Master of Science in Software Engineering</h1>
          <h4>Université de Strasbourg</h4>
          <h5>Strasbourg, France</h5>
          <p class="date">Since September 2022</p>
          <div><p>This is a two-year co-op program. The syllabus is available <a href="https://mathinfo.unistra.fr/formations/master/informatique/science-et-ingenierie-du-logiciel-sil/">here</a>.</p></div>
        </div>
        <div id="formation-panel-2" class="panel hidden" data-body="formation" tabindex="0" aria-labelledby="formation-tab-2">
          <h1>Bachelor of Science in Computer Science</h1>
          <h4>Université de Strasbourg</h4>
          <h5>Strasbourg, France</h5>
          <p class="date">September 2018 - June 2022</p>
          <div><p>The first semester is the same as for the BS of Mathematics. It was at the end of this first semester that I had the opportunity to choose the "Computer Science" orientation. The syllabus is available <a href="https://mathinfo.unistra.fr/formations/licence/informatique/#data-rof-tab-presentation">here</a>.</p></div>
        </div>
        <div id="formation-panel-3" class="panel hidden" data-body="formation" tabindex="0" aria-labelledby="formation-tab-3">
          <h1>Baccalauréat Scientifique</h1>
          <h4>Lycée Henrick Meck</h4>
          <h5>Molsheim, France</h5>
          <p class="date">September 2015 - June 2018</p>
          <div><p>I graduated from high school (french baccalauréat) with a scientific orientation: mathematics, physics and biology. In addition to the classic courses, I also prepared for the ABIBAC exam (simultaneous graduation from both the french and german highschool) which I left before entering my final year. During my last year, I chose the ISN course "Computer Science and Digital Science" where I first learned about computer science.</p></div>
        </div>
        <div id="formation-panel-4" class="panel others hidden" data-body="formation" tabindex="0" aria-labelledby="formation-tab-4">
          <h1>Others</h1>
          <ul>
            <li>English : LanguageCert - Level C1<small>(2022)</small></li>
            <li>French driving license: Permis B<small>(2019)</small></li>
            <li>German : Deutsches Sprachdiplom - Level B1<small>(2015)</small></li>
            <li>Bilingual German education since kindergarten <small>(2003)</small></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SectionFormation',
  }
</script>
