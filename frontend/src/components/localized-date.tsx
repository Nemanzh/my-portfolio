// src/components/localized-date.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';

interface LocalizedDateProps {
  dateString: string;
  isEndDate?: boolean;
}

export function LocalizedDate({
  dateString,
  isEndDate = false,
}: LocalizedDateProps) {
  const locale = useLocale();
  const t = useTranslations('experience');

  if (!dateString && isEndDate) {
    return <span>{t('present')}</span>;
  }

  if (!dateString) return null;

  try {
    const date = new Date(dateString);

    // Map locale to Intl locale
    const intlLocale = locale === 'sr-Cyrl' ? 'sr-RS' : locale;

    return (
      <span>
        {date.toLocaleDateString(intlLocale, {
          year: 'numeric',
          month: 'long',
        })}
      </span>
    );
  } catch {
    return <span>{dateString}</span>;
  }
}
