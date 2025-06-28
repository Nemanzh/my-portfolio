'use client';

import { useApiLoading } from '@/hooks/use-api-loading';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function GlobalLoading() {
  const t = useTranslations('general');
  const isLoading = useApiLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        <span className="text-sm font-medium">{t('loading')}</span>
      </div>
    </div>
  );
}
