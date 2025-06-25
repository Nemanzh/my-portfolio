'use client';

import { useApiLoading } from '@/hooks/useApiLoading';
import { Loader2 } from 'lucide-react';

export const GlobalLoading = () => {
  const isLoading = useApiLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    </div>
  );
};
