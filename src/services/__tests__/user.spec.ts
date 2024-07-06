import { describe, expect, test, vi } from 'vitest'
import apiClient from '../api';
import { getUserData } from '../user';
import { mockUser } from '@/__test__/mocks'
import { fail } from 'node:assert'

vi.mock('../api'); // Mock the apiClient dependency

describe('User Service', () => {

  describe('getUserData', () => {

    test('fetch user data successfully', async () => {

      // Set up the mock implementation for apiClient.get
      apiClient.get = vi.fn().mockResolvedValueOnce({ data: mockUser });

      // Execute
      const userData = await getUserData();

      // Assert
      expect(userData).toEqual(mockUser);
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