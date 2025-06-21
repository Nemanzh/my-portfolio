import { api } from './axios';

export async function getAbout() {
  try {
    const { data } = await api.get('/about');
    return data;
  } catch (error) {
    console.error('Failed to fetch About content:', error);
  }
}
