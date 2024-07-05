<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import ExperienceContainer from '@/components/ExperienceContainer.vue'
import ProjectContainer from "@/components/ProjectContainer.vue";
import type {Experience, Project, User} from "@/types/models";

// Define the props for the component
const props = defineProps<{
  user: User
}>()

// TODO : Temp values until API returns it
/*const experiences: Experience[] = [
  {
    title: "Software developer",
    company: "Mind7 Consulting",
    period: "Since 2022",
    order: 0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus.",
    technologies: ['Java 8/11', 'Spring', 'Jakarta Server Pages'],
    location: "Noisy-le-Grand, France",
    url: "https://www.cgi.com/en",
    shortUrl: "cgi.com",
    logo: ""
  },
  {
    title: "Test",
    company: "Group",
    period: "2018-2022",
    order: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus.",
    technologies: [],
    location: "Remote",
    url: "",
    logo: ""
  },
]
const education: Experience[] = [
  {
    title: "Software developer",
    company: "Mind7 Consulting",
    period: "Since 2022",
    order: 0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus.",
    technologies: ['Java 8/11', 'Spring', 'Jakarta Server Pages'],
    location: "Noisy-le-Grand, France",
    url: "https://www.cgi.com/en",
    shortUrl: "cgi.com",
    logo: ""
  },
  {
    title: "Test",
    company: "Group",
    period: "2018-2022",
    order: 1,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus.",
    technologies: [],
    location: "Remote",
    url: "",
    logo: ""
  },
]*/
</script>

<template>
  <HeaderComponent/>
  <HeroComponent
      :hero="user.hero"
  />
  <AboutComponent
      :about="user.about"
  />
<!--  <ExperienceContainer
      title="Work"
      :experiences="experiences"
  />-->
  <ProjectContainer
      :projects="user.projects"
  />
<!--  <ExperienceContainer
      title="Education"
      :experiences="education"
  />-->
  <FooterComponent
      :user="user"
  />
</template>

<style scoped>

</style>