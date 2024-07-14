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
  creditsUrl: string
  creditsShortUrl: string
}

export interface Social {
  index: number
  hidden: boolean
  name: string
  pseudo?: string
  url: string
  image: FileType
}

export interface Technology {
  name: string
}

export interface Project {
  index: number
  hidden: boolean
  url?: string
  title: string
  description: string
  image?: FileType
  technologies?: Technology[]
}

export interface Experience {
  index: number
  hidden: boolean
  title: string
  organisation: string
  period?: string
  location?: string
  url?: string
  urlShort?: string
  description: string
  technologies?: Technology[]
}

export interface WorkItem {
  index: number
  hidden: boolean
  title: string
  projects?: Project[]
  experiences?: Experience[]
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
  imageResponsive?: FileType
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
