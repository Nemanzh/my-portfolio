'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { getEducation, getExperience } from '@/lib/api';

export function useLocalizedEducation() {
  const locale = useLocale();

  return useQuery({
    queryKey: ['education', locale],
    queryFn: () => getEducation(locale),
  });
}

export function useLocalizedExperience() {
  const locale = useLocale();

  return useQuery({
    queryKey: ['experience', locale],
    queryFn: () => getExperience(locale),
  });
}
