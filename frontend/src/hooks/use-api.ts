// src/hooks/use-api.ts
import { useLocale } from 'next-intl';
import {
  getSkills,
  getEducation,
  getAbout,
  getExperience,
  getContact,
  prefetchAllData,
} from '@/lib/api';

export function useLocalizedApi() {
  const locale = useLocale();

  return {
    getSkills: () => getSkills(),
    getEducation: () => getEducation(locale),
    getAbout: () => getAbout(locale),
    getExperience: () => getExperience(locale),
    getContact: () => getContact(locale),
    prefetchAllData: () => prefetchAllData(locale),
  };
}
