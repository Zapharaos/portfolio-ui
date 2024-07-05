export interface User {
  name: string
  email: string
  location: string
  locale: string
  logo: FileType
  resume: FileType
  socials: Social[]
  hero: Hero
  about: About
  work: Work
  footer: Footer
}

export interface FileType {
  name: string
  file: string
}

export interface Social {
  name: string
  pseudo: string
  url: string
  image: FileType
  index: number
  hidden: boolean
}

export interface Technology {
  name: string
}

export interface Project {
  title: string
  index: number
  description: string
  image: FileType
  url: string
  technologies: Technology[]
  hidden: boolean
}

export interface Experience {
  title: string
  organisation: string
  period: string
  location: string
  url: string
  urlShort: string
  description: string
  technologies: Technology[]
  index: number
  hidden: boolean
}

export interface WorkItem {
  index: number
  hidden: boolean
  title: string
  projects: Project[]
  experiences: Experience[]
  showProjects: boolean
  showExperiences: boolean
}

export interface Work {
  items: WorkItem[]
}

export interface Hero {
  title: string
  tagline: string
  callToActionContent: string
  backgroundImage: FileType
}

export interface About {
  image: FileType
  imageResponsive: FileType
  description: string
}

export interface Footer {
  title: string
  subTitle: string
  showLocation: boolean
  showSocials: boolean
  showEmail: boolean
  showResume: boolean
}
