import { describe, expect, test, vi } from 'vitest'
import apiClient from '../api';
import { getUserData } from '../user';
import type {About, FileType, Footer, Hero, User, Work} from '@/types/models';
import { fail } from 'node:assert'
import {flushPromises} from "@vue/test-utils";

vi.mock('../api'); // Mock the apiClient dependency

describe('User Service', () => {

  const mockFileType: FileType = {
    name: 'name',
    file: 'file',
  }
  const mockHero: Hero = {
    title: 'title',
    tagline: 'tagline',
    callToActionContent: 'callToActionContent',
    backgroundImage: mockFileType,
  }
  const mockAbout: About = {
    image: mockFileType,
    description: 'description',
  }
  const mockWork: Work = {
    items: []
  }
  const mockFooter: Footer = {
    title: 'title',
    subTitle: 'subTitle',
    showLocation: false,
    showSocials: false,
    showEmail: false,
    showResume: false,
  }
  const mockData: User = {
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

  describe('getUserData', () => {

    test('fetch user data successfully', async () => {

      // Set up the mock implementation for apiClient.get
      apiClient.get = vi.fn().mockResolvedValueOnce({ data: mockData });

      // Execute
      const userData = await getUserData();

      // Assert
      expect(userData).toEqual(mockData);
      expect(apiClient.get).toHaveBeenCalledOnce();
    })

    test('should not fail upon empty data returned', async () => {
      // Set up the mock implementation for apiClient.get
      apiClient.get = vi.fn().mockResolvedValueOnce({ data: {} });

      // Execute
      const userData = await getUserData();

      // Assert
      expect(userData).toEqual({});
      expect(apiClient.get).toHaveBeenCalledOnce();
    });

    test('should handle errors', async () => {
      // Set up the mock implementation for apiClient.get
      apiClient.get = vi.fn().mockRejectedValueOnce(new Error('Network Error'));

      // Execute & Assert
      try {
        await getUserData();
        fail('Expected an error to be thrown');
      } catch (error: any) {
        expect(error.message).toBe('Network Error');
      }
      expect(apiClient.get).toHaveBeenCalledOnce();
    })
  })
})