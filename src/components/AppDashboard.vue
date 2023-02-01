<template>
  <section-presentation/>
  <section-aboutme/>
  <section-experience/>
  <section-formation/>
  <section-project/>
  <div id="curriculum">
    <p>For your reference, here is my curriculum.</p>
    <form action="./assets/files/curriculum.pdf" target="_blank">
      <button><i class="fa fa-download"></i>Download</button>
    </form>
  </div>
  <section-contact/>
</template>

<script>
import SectionPresentation from '@/components/SectionPresentation.vue'
import SectionAboutme from '@/components/SectionAboutme.vue'
import SectionExperience from '@/components/SectionExperience.vue'
import SectionFormation from '@/components/SectionFormation.vue'
import SectionProject from '@/components/SectionProject.vue'
import SectionContact from '@/components/SectionContact.vue'

export default {
  name: 'AppDashboard',
  components: {
    SectionPresentation,
    SectionAboutme,
    SectionExperience,
    SectionFormation,
    SectionProject,
    SectionContact
  }
}
</script>
