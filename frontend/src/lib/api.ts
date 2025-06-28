import { api } from './axios';
import type { Skill } from '@/types/skill';
import type { Education } from '@/types/education';
import type { About } from '@/types/about';
import { Experience } from '@/types/experience';
import { Contact } from '@/types/contact';

export async function getSkills(): Promise<Skill[]> {
  try {
    const { data } = await api.get(`/api/skills?populate=icon`);
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Skills:', error);
    return [];
  }
}

export async function getEducation(
  locale: string = 'en'
): Promise<Education[]> {
  try {
    const { data } = await api.get(
      `/api/educations?populate=school_logo&sort=order_number:asc&locale=${locale}`
    );
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Education:', error);
    return [];
  }
}

export async function getAbout(locale: string = 'en'): Promise<About | null> {
  try {
    const { data } = await api.get(`/api/about?locale=${locale}`);
    return data?.data || null;
  } catch (error) {
    console.error('Failed to fetch About:', error);
    return null;
  }
}

export async function getExperience(
  locale: string = 'en'
): Promise<Experience[]> {
  try {
    const { data } = await api.get(
      `/api/experiences?populate=company_logo&sort=order_number:asc&locale=${locale}`
    );
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Experience:', error);
    return [];
  }
}

export async function getContact(
  locale: string = 'en'
): Promise<Contact | null> {
  try {
    const { data } = await api.get(`/api/contact?locale=${locale}`);
    return data?.data || null;
  } catch (error) {
    console.error('Failed to fetch Contact:', error);
    return null;
  }
}

export async function prefetchAllData(locale: string = 'en') {
  try {
    const [skills, education, about, experience, contact] =
      await Promise.allSettled([
        getSkills(),
        getEducation(locale),
        getAbout(locale),
        getExperience(locale),
        getContact(locale),
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
    return {
      skills: [],
      education: [],
      about: null,
      experience: [],
      contact: null,
    };
  }
}
