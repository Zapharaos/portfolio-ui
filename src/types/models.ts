export interface Theme {
  name: string
  background: string
  text: string
  primary: string
}

export interface User {
  name: string
  email: string
  location: string
  locale: string
  timezone?: string
  logo: FileType
  resume: FileType
  socials: Social[]
  theme: Theme | null
  hero: Hero
  about: About
  work: Work
  footer: Footer
}

export interface FileType {
  name: string
  file: string
  creditsUrl?: string
  creditsShortUrl?: string
}

export interface Social {
  index: number
  hidden: boolean
  name: string
  pseudo?: string
  url: string
  image: FileType
  color?: string
}

export interface Technology {
  name: string
  color?: string
}

export type ProjectLinkKind =
  | 'github'
  | 'website'
  | 'appstore'
  | 'playstore'
  | 'docs'
  | 'other'

export interface ProjectLink {
  kind: ProjectLinkKind
  url: string
  label?: string
  icon?: FileType
  color?: string
  index: number
}

export interface Project {
  id?: number
  index: number
  hidden: boolean
  url?: string
  title: string
  description: string
  category?: string
  metric?: string
  isNew?: boolean
  // Populated client-side by merging the dedicated /projects/health/ endpoint.
  healthUp?: boolean | null
  healthCheckedAt?: string | null
  image?: FileType
  technologies?: Technology[]
  links?: ProjectLink[]
}

export interface ProjectHealth {
  id: number
  healthUp?: boolean | null
  healthCheckedAt?: string | null
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
