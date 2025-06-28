'use client';

import { useEffect, useState } from 'react';

export function useApiLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoadingChange = (event: CustomEvent<boolean>) => {
      setIsLoading(event.detail);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener(
        'api-loading',
        handleLoadingChange as EventListener
      );

      return () => {
        window.removeEventListener(
          'api-loading',
          handleLoadingChange as EventListener
        );
      };
    }
  }, []);

  return isLoading;
}
