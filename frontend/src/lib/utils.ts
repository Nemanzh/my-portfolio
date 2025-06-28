// src/lib/utils.ts
import { useLocale } from 'next-intl';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locale?: string): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    const dateLocale = locale || 'en';

    return date.toLocaleDateString(
      dateLocale === 'sr-Cyrl' ? 'sr-RS' : dateLocale,
      {
        year: 'numeric',
        month: 'long',
      }
    );
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function useLocalizedDate(dateString: string): string {
  const locale = useLocale();
  return formatDate(dateString, locale);
}
