// hooks/useApiLoading.ts
import { useEffect, useState } from 'react';

export const useApiLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoadingChange = (event: CustomEvent) => {
      setIsLoading(event.detail);
    };

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
  }, []);

  return isLoading;
};
