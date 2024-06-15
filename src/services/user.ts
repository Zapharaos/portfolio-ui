import apiClient from './api';
import { type User } from '@/types/models';

export const getUserData = async (): Promise<User> => {
    try {
        const response = await apiClient.get<User>('user/');
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the user data!", error);
        throw error;
    }
};
