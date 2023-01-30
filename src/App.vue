<template>
  <header>
    <div id="menu">
      <a onclick="goToByScroll('header', 'slow')">
        <img id="nav-logo" src="./assets/logo.png" alt="Logo">
      </a>
      <div id="bars">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
    <nav>
      <ul>
        <li><a onclick="goToByScroll('aboutme', 'slow')">About me</a></li>
        <li><a onclick="goToByScroll('experience', 'slow')">Experience</a></li>
        <li><a onclick="goToByScroll('formation', 'slow')">Formation</a></li>
        <li><a onclick="goToByScroll('project', 'slow')">Project</a></li>
        <li><a onclick="goToByScroll('contact', 'slow')">Contact</a></li>
        <li onclick="switchTheme()"><i class="fas fa-moon"></i></li>
      </ul>
    </nav>
  </header>

  <section id="section-presentation">
    <h1>Hi, I'm Matthieu Freitag.</h1>
    <h2>Nice to meet you.</h2>
    <h2>Please, take a look around!</h2>
    <img id="background-logo" src="./assets/background-logo.png" alt="">
  </section>
  <section id="section-aboutme">
    <h3>About me</h3>
    <div id="article">
      <div id="text">
        <p>My name is Matthieu Freitag. I'm a 23 year old french and german citizen.</p>
        <p>I'm currently engaged until September 2024 as a graduate student in software engineering at the University of Strasbourg, France. In addition, and as part of this apprenticeship, I'm working as a consulting software engineer at the DGFiP in Paris which is part of the French Ministry of the Economy and Finance.</p>
        <p>I'm curious and constantly looking to improve myself. I am highly motivated and determined to produce quality work that I am proud of. I enjoy communicating and meeting people. I am passionate about traveling and discovering new cultures.</p>
      </div>
      <img id="picture" src="./assets/picture.png" alt="Picture of me">
    </div>
    <div id="socials">
      <p>Learn more about me by checking out my socials.</p>
      <ul>
        <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
        <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
      </ul>
    </div>
  </section>

  <section>
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
  <section>
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
  <section>
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

  <div id="curriculum">
    <p>For your reference, here is my curriculum.</p>
    <form action="download/curriculum.pdf" target="_blank">
      <button><i class="fa fa-download"></i>Download</button>
    </form>
  </div>
  <section id="contact">
    <h3>Contact</h3>
    <form id="form">
      <div>
        <input type="text" id="name" name="name" placeholder="Name" tabindex="1" required>
        <input type="email" id="email" name="email" placeholder="Email" tabindex="2" required>
      </div>
      <input type="text" id="subject" name="subject" placeholder="Subject" tabindex="3" required>
      <textarea rows="5" id="message" name="message" placeholder="Message" tabindex="4" required></textarea>
      <button type="submit" name="submit" value="Submit">Submit</button>
      <input type="hidden" name="spam">
    </form>
  </section>

  <footer>
    <a href="https://github.com/Zapharaos/portfolio">© 2023 - Designed & Built by Matthieu Freitag</a>
    <ul>
      <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
      <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
    </ul>
  </footer>

  <div id="top">
    <a onclick="goToByScroll('header', 'fast')"><i class="fas fa-angle-up"></i></a>
  </div>
  <div id="overlay"></div>
  <div id="notification">
    <div>
      <i class="fas fa-2x"></i>
      <p></p>
      <i class="fas fa-times" onclick="toggleNotification(2,'')"></i>
    </div>
  </div>
</template>

<script>
/*
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
 */
</script>

<style>

</style>
