import type {
  About,
  Experience,
  FileType,
  Footer,
  Hero,
  Project,
  ProjectHealth,
  ProjectLink,
  Social,
  Technology,
  Theme,
  User,
  Work,
  WorkItem
} from '@/types/models'

export const mockFileType: FileType = {
  name: 'name',
  file: 'file',
  creditsUrl: 'https://credits.com',
  creditsShortUrl: 'credits.com'
}
export const mockHero: Hero = {
  title: 'title',
  tagline: 'tagline',
  callToActionContent: 'callToActionContent',
  backgroundImage: mockFileType
}
export const mockAbout: About = {
  image: mockFileType,
  description: 'description'
}
export const mockWorkItem: WorkItem = {
  index: 0,
  hidden: false,
  title: 'title',
  projects: [],
  experiences: [],
  showProjects: false,
  showExperiences: false
}
export const mockWork: Work = {
  items: []
}
export const mockFooter: Footer = {
  title: 'title',
  subTitle: 'subTitle',
  showLocation: false,
  showSocials: false,
  showEmail: false,
  showResume: false
}
export const mockSocials: Social[] = [
  {
    index: 0,
    hidden: false,
    name: 'GitHub',
    pseudo: 'octocat',
    url: 'https://github.com/octocat',
    image: mockFileType,
    color: '#6e5494'
  },
  {
    index: 1,
    hidden: false,
    name: 'Website',
    url: 'https://example.com',
    image: mockFileType
  }
]
export const mockTheme: Theme = {
  name: 'Ocean',
  background: '#0b1622',
  text: '#eaf2ff',
  primary: '#00add8'
}
export const mockUser: User = {
  name: 'Name',
  email: 'contact@example.com',
  location: 'location',
  locale: 'en-US',
  timezone: '',
  logo: mockFileType,
  resume: mockFileType,
  socials: [],
  theme: null,
  hero: mockHero,
  about: mockAbout,
  work: mockWork,
  footer: mockFooter
}
export const mockUserWithTheme: User = {
  ...mockUser,
  theme: mockTheme
}
export const mockTechnologies: Technology[] = [
  { name: 'tech1', color: '#ff8800' },
  { name: 'tech2' },
  { name: 'tech3' }
]
export const mockProjectLinks: ProjectLink[] = [
  { kind: 'website', url: 'https://url.com', label: '', index: 10 },
  { kind: 'github', url: 'https://github.com/example', label: '', index: 20 }
]
export const mockProject: Project = {
  id: 1,
  index: 0,
  hidden: false,
  url: 'https://url.com',
  title: 'title',
  description: 'description',
  image: mockFileType,
  technologies: mockTechnologies,
  links: mockProjectLinks
}
export const mockProjects: Project[] = [
  { ...mockProject, id: 3, index: 2, title: 'Gamma' },
  { ...mockProject, id: 1, index: 0, title: 'Alpha' },
  { ...mockProject, id: 2, index: 1, title: 'Beta' }
]
export const mockProjectsHealth: ProjectHealth[] = [
  { id: 1, healthUp: true, healthCheckedAt: '2026-01-01T00:00:00Z' },
  { id: 2, healthUp: false, healthCheckedAt: null }
]
export const mockExperience: Experience = {
  index: 0,
  hidden: false,
  title: 'title',
  organisation: 'organisation',
  period: 'period',
  location: 'location',
  url: 'https://url.com',
  urlShort: 'url.com',
  description: 'description',
  technologies: mockTechnologies
}
