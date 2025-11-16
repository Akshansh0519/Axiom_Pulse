'use client';

import { useTokens } from '@/hooks/useTokens';
import { useRealtimePrices } from '@/hooks/useRealtimePrices';
import { TokenCardGrid } from './TokenCardGrid';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';

export function TokenTableContainer() {
  const { isLoading, error } = useTokens();
  useRealtimePrices([]);

  if (isLoading) {
    return <TableSkeleton rows={15} columns={3} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#5865F2] text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <TokenCardGrid />;
}