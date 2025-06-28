'use client';

import { useApiLoading } from '@/hooks/use-api-loading';
import { useEffect } from 'react';

declare global {
  interface Window {
    apiLoading: boolean;
  }
}

export function useDebugLoading() {
  const isLoading = useApiLoading();
  window.apiLoading = isLoading;
  useEffect(() => {
    console.log('🔄 Loading state changed:', isLoading);
    if (typeof window !== 'undefined') {
      window.apiLoading = isLoading;
    }
  }, [isLoading]);

  return isLoading;
}
