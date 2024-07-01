export interface Theme {
  name: string
  todo: string
}

export interface User {
  id: number
  hero: string
  description: string
  email: string
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
  url: string
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

export interface Work {
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
