import { Skill } from '@/types/skill';
import api from './axios';

export function mapLocaleToStrapi(locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en',
    sr: 'sr',
    'sr-Cyrl': 'sr-Cyrl',
  };

  return localeMap[locale] || 'en';
}

export async function getSkills(locale: string = 'en'): Promise<Skill[]> {
  try {
    const strapiLocale = mapLocaleToStrapi(locale);
    const { data } = await api.get(
      `/api/skills?populate=icon&locale=${strapiLocale}`
    );
    return data?.data || [];
  } catch (error) {
    console.error('Failed to fetch Skills:', error);
    return [];
  }
}
