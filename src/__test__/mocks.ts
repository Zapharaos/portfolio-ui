import type {About, Experience, FileType, Footer, Hero, Project, Technology, User, Work} from "@/types/models";

export const mockFileType: FileType = {
    name: 'name',
    file: 'file',
}
export const mockHero: Hero = {
    title: 'title',
    tagline: 'tagline',
    callToActionContent: 'callToActionContent',
    backgroundImage: mockFileType,
}
export const mockAbout: About = {
    image: mockFileType,
    description: 'description',
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
    showResume: false,
}
export const mockUser: User = {
    name: 'Name',
    email: 'contact@example.com',
    location: 'location',
    locale: 'locale',
    logo: mockFileType,
    resume: mockFileType,
    socials: [],
    hero: mockHero,
    about: mockAbout,
    work: mockWork,
    footer: mockFooter,
};
export const mockTechnologies: Technology[] = [
    {name: 'tech1'}, {name: 'tech2'}, {name: 'tech3'}
];
export const mockProject: Project = {
    index: 0,
    hidden: false,
    url: 'https://url.com',
    title: 'title',
    description: 'description',
    image: mockFileType,
    technologies: mockTechnologies,
};
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
    technologies: mockTechnologies,
};