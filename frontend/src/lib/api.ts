// lib/api.ts (updated)
import { api } from './axios';
import type { Skill } from '@/types/skill';
import type { Education } from '@/types/education';
import type { About } from '@/types/about';

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data } = await api.get('/api/skills?populate=icon');
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Skills:', error);
    // Return empty array instead of throwing
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const { data } = await api.get('/api/educations?populate=school_logo');
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Education:', error);
    return [];
  }
}

export async function getAbout(): Promise<About | null> {
  try {
    const { data } = await api.get('/api/about');
    return data?.data || null;
  } catch (error) {
    console.error('Failed to fetch About:', error);
    return null;
  }
}

// New: Prefetch data for better performance
export async function prefetchAllData() {
  try {
    const [skills, education, about] = await Promise.allSettled([
      getSkills(),
      getEducation(),
      getAbout(),
    ]);

    return {
      skills: skills.status === 'fulfilled' ? skills.value : [],
      education: education.status === 'fulfilled' ? education.value : [],
      about: about.status === 'fulfilled' ? about.value : null,
    };
  } catch (error) {
    console.error('Failed to prefetch data:', error);
    return { skills: [], education: [], about: null };
  }
}
