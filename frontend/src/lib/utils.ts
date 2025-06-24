import { About } from '@/types/about';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string | Date): string => {
  try {
    // If it's already in a readable format, return as is
    if (
      typeof dateString === 'string' &&
      dateString.match(/^[A-Za-z]+ \d{4}$/)
    ) {
      return dateString;
    }

    // Parse different date formats
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString.toString(); // Return original if parsing fails
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString.toString();
  }
};

// Helper function to extract just the text content from About body
export function extractAboutText(about: About | null): string {
  if (!about?.body) return '';

  return about.body
    .map((block) => block.children.map((child) => child.text).join(''))
    .join('\n\n')
    .trim();
}

// Helper function to format About content for display
export function formatAboutContent(about: About | null): string[] {
  if (!about?.body) return [];

  return about.body
    .map((block) =>
      block.children
        .map((child) => child.text)
        .join('')
        .trim()
    )
    .filter((text) => text.length > 0);
}
