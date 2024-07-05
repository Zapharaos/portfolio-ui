export interface User {
  name: string
  email: string
  location: string
  locale: string
  socials: Social[]
  hero: Hero
  about: About
  footer: Footer
  projects: Project[]
}

export interface Image {
  name: string
  file: string
}

export interface Social {
  name: string
  pseudo: string
  url: string
  image: Image
  hidden: boolean
}

export interface Technology {
  name: string
}

export interface Project {
  title: string
  index: number
  description: string
  image: Image
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

export interface Hero {
  title: string
  tagline: string
  callToActionContent: string
  backgroundImage: Image
}

export interface About {
  image: Image
  imageResponsive: Image
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
