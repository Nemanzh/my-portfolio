import { api } from './axios';
import type { Skill } from '@/types/skill';
import type { Education } from '@/types/education';
import type { About } from '@/types/about';
import { Experience } from '@/types/experience';
import { Contact } from '@/types/contact';

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data } = await api.get('/api/skills?populate=icon');
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Skills:', error);
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const { data } = await api.get(
      '/api/educations?populate=school_logo&sort=order_number:asc'
    );
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

export async function getExperience(): Promise<Experience[]> {
  try {
    const { data } = await api.get(
      '/api/experiences?populate=company_logo&sort=order_number:asc'
    );
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Experience:', error);
    return [];
  }
}

export async function getContact(): Promise<Contact | null> {
  try {
    const { data } = await api.get('/api/contact');
    return data?.data || null;
  } catch (error) {
    console.error('Failed to fetch About:', error);
    return null;
  }
}

export async function prefetchAllData() {
  try {
    const [skills, education, about, experience, contact] =
      await Promise.allSettled([
        getSkills(),
        getEducation(),
        getAbout(),
        getExperience(),
        getContact(),
      ]);

    return {
      skills: skills.status === 'fulfilled' ? skills.value : [],
      education: education.status === 'fulfilled' ? education.value : [],
      about: about.status === 'fulfilled' ? about.value : null,
      experience: experience.status === 'fulfilled' ? experience.value : [],
      contact: contact.status === 'fulfilled' ? contact.value : null,
    };
  } catch (error) {
    console.error('Failed to prefetch data:', error);
    return { skills: [], education: [], about: null, experience: [] };
  }
}
