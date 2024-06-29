<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { computed, onMounted } from 'vue'

const projects = [
  {
    title: "To-Do List App",
    image: "todo-list.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    technologies: ["HTML", "CSS", "JavaScript"],
    order: 1,
  },
  {
    title: "Online Shopping Cart",
    image: "todo-list.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus.",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    order: 2,
  },
  {
    title: "Image Gallery",
    image: "", /*https://www.zupimages.net/up/24/26/4lsk.png*/
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    order: 3,
  },
  {
    title: "To-Do List App",
    image: "todo-list.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet auctor neque. Integer ac nibh dignissim, dapibus ligula non, porta sem. Duis at consequat nisl, at bibendum sapien. Curabitur finibus turpis nibh, in hendrerit ligula consectetur eget. Integer iaculis augue vitae orci congue efficitur. Sed blandit lorem sed lacus.",
    technologies: ["HTML", "CSS", "JavaScript"],
    order: 4,
  },
];

onMounted(() => {
  projects.slice().sort((a, b) => a.order - b.order);
})

const splitProjects = computed(() => {
  return {
    even: projects.filter((_, index) => index % 2 === 0),
    odd: projects.filter((_, index) => index % 2 !== 0),
  };
});
</script>

<template>
  <section id="projects">
    <h2>Projects</h2>
    <div class="projects">
      <ul class="projects-list responsive">
        <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
      </ul>
      <ul class="projects-list">
        <ProjectCard v-for="project in splitProjects.even" :key="project.title" :project="project" />
      </ul>
      <ul class="projects-list">
        <ProjectCard v-for="project in splitProjects.odd" :key="project.title" :project="project" />
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 5rem;
  width: 100%;
}
h2 {
  font-size: 3rem;
  color: white;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.projects {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.projects-list{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.projects-list.responsive {
  display: none;
}

@media (max-width: 768px) {
  section {
    padding: 2rem;
  }
  h2 {
    text-align: center;
  }
  .projects {
    grid-template-columns: 1fr;
  }
  .projects-list.responsive {
    display: flex;
  }
  .projects-list:not(.responsive) {
    display: none;
  }
}

@media (max-width: 400px) {
  section {
    padding: 1rem;
  }
  .projects {
    gap: 1rem;
  }
  .projects-list {
    gap: 1rem;
  }
}
</style>