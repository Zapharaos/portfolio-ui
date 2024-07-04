export interface Theme {
  name: string
  todo: string
}

export interface User {
  id: number
  name: string
  email: string
  location: string
  locale: string
  footer: Footer

  hero: string
  description: string
  logo: string
  photo?: string
  curriculum?: string
  theme_light?: Theme
  theme_dark?: Theme
  socials: Social[]
  lists: List[]
  projects: Project[]
}

export interface Social {
  name: string
  pseudo: string
  url: string
  svg: Svg
  hidden: boolean
}

export interface List {
  name: string
  index: number
  hidden: boolean
  items: ListItem[]
}

export interface ListItem {
  index: number
  organisation: string
  name: string
  menuName?: string
  address?: string
  period?: string
  description?: string
  hidden: boolean
}

export interface Project {
  title: string
  description: string
  url: string
  image: string
  order: number
  technologies: Technologies
}

export interface Experience {
  title: string
  company: string
  period: string
  order: number
  description: string
  technologies: Technologies
  location: string
  url: string
  shortUrl?: string
  logo: string
}

export type Technologies = string[]

export interface Svg {
  name: string
  file: string
}

export interface Footer {
  title: string
  subTitle: string
  showLocation: boolean
  showSocials: boolean
  showEmail: boolean
  showResume: boolean
}
