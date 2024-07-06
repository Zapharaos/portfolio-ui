import type {About, FileType, Footer, Hero, User, Work} from "@/types/models";

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