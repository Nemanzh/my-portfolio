import { Skill } from '@/types/skill';
import api from './axios';

export const addTestDelay = (ms: number = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getSkills(): Promise<Skill[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      await addTestDelay(2000);
    }

    const { data } = await api.get('/api/skills?populate=icon');
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Skills:', error);
    return [];
  }
}
