import { describe, expect, test, vi } from 'vitest'
import apiClient from '../api';
import { getUserData } from '../user';
import type { User } from '@/types/models';
import { fail } from 'node:assert'

vi.mock('../api'); // Mock the apiClient dependency

describe('User Service', () => {

  describe('getUserData', () => {

    test('fetch user data successfully', async () => {
      const mockData: User = {
        id: 1,
        hero: 'Hero',
        description: 'Description',
        email: 'john.doe@example.com',
        logo: '',
        photo: undefined,
        curriculum: undefined,
        theme_light: undefined,
        theme_dark: undefined,
        socials: [],
        lists: []
      };

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