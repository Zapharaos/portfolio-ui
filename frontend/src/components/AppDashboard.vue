<template>

  <section id="section-presentation">
    <h1>Hi, I'm Matthieu Freitag.</h1>
    <h2>Nice to meet you.<br>Please, take a look around!</h2>
    <img id="background-logo" src="../assets/background-logo.png" alt="">
  </section>

  <section id="section-aboutme">
    <h3>About me</h3>
    <div id="article">
      <div id="text">
        <p>My name is Matthieu Freitag. I'm a 23 year old french and german citizen.</p>
        <p>I'm currently engaged until September 2024 as a graduate student in software engineering at the University of Strasbourg, France. In addition, and as part of this apprenticeship, I'm working as a consulting software engineer at the DGFiP in Paris which is part of the French Ministry of the Economy and Finance.</p>
        <p>I'm curious and constantly looking to improve myself. I am highly motivated and determined to produce quality work that I am proud of. I enjoy communicating and meeting people. I am passionate about traveling and discovering new cultures.</p>
      </div>
      <img id="picture" src="../assets/picture.png" alt="Picture of me">
    </div>
    <div id="socials">
      <p>Learn more about me by checking out my socials.</p>
      <ul>
        <li><a href="https://www.linkedin.com/in/matthieu-freitag-b06436218"><i class="fab fa-linkedin fa-3x"></i></a></li>
        <li><a href="https://github.com/Zapharaos"><i class="fab fa-github fa-3x"></i></a></li>
      </ul>
    </div>
  </section>

  <list-component/>

  <div id="curriculum">
    <p>For your reference, here is my curriculum.</p>
    <form action="./assets/files/curriculum.pdf" target="_blank">
      <button><i class="fa fa-download"></i>Download</button>
    </form>
  </div>

  <form-contact/>

</template>

<script>
import FormContact from '@/components/FormContact.vue'
import ListComponent from '@/components/ListComponent.vue'

export default {
  name: 'AppDashboard',
  components: {
    FormContact,
    ListComponent
  }
}
</script>

<style>
/* curriculum */

#curriculum {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3% 0 0 0;
  margin: 0 auto;
  margin-top: 0 !important;
  color: var(--text-color);
  width: 75%;
}

#curriculum p {
  text-align: center;
}

#curriculum a {
  text-decoration: none;
}
</style>

