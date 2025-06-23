import { api } from './axios';
import { About } from '@/types/about';
import { Education } from '@/types/education';
import { Skill } from '@/types/skill';

export async function getAbout(): Promise<About | null> {
  try {
    const { data } = await api.get('/api/about');
    const locale = data?.data?.locale ?? '';
    const text = data?.data?.body?.[0]?.children?.[0]?.text ?? '';

    return { locale, text };
  } catch (error) {
    console.error('Failed to fetch About content:', error);
    return null;
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data } = await api.get('/api/skills?populate=icon');

    return data?.data as Skill[];
  } catch (error) {
    console.error('Failed to fetch Skills:', error);
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    console.log('Fetching Education from Strapi API...');
    const { data } = await api.get('/api/educations?populate=school_logo');

    console.log('Fetched Education:', data);
    return data?.data as Education[];
  } catch (error) {
    console.error('Failed to fetch Education:', error);
    return [];
  }
}
