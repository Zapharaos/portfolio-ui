// src/types/models.ts

export interface Theme {
    name: string;
    todo: string;  // e.g., #FFFFFF
}

export interface User {
    id: number;
    hero: string;
    description: string;
    email: string;
    logo: string;
    photo?: string;
    curriculum?: string;
    theme_light?: Theme;
    theme_dark?: Theme;
    socials: Social[];
    lists: List[];
}

export interface Social {
    name: string;
    url: string;
    hidden: boolean;
}

export interface List {
    name: string;
    index: number;
    hidden: boolean;
    items: ListItem[];
}

export interface ListItem {
    index: number;
    organisation: string;
    name: string;
    menuName?: string;
    address?: string;
    period?: string;
    description?: string;
    hidden: boolean;
}
