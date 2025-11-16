'use client';

import { Skeleton } from '@/components/atoms/Skeleton';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 10, columns = 8 }: TableSkeletonProps) {
  return (
    <div className="glass-heavy rounded-xl overflow-hidden">
      {/* Header skeleton */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
        {Array.from({ length: columns }, (_, i) => (
          <Skeleton key={`header-${i}`} width={100} height={20} />
        ))}
      </div>
      
      {/* Row skeletons */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex items-center gap-4 px-6 py-4">
            <Skeleton circle width={36} height={36} />
            <Skeleton width={80} height={16} />
            <Skeleton width={100} height={16} />
            <Skeleton width={80} height={16} />
            <Skeleton width={100} height={16} />
            <Skeleton width={80} height={16} />
            <Skeleton width={100} height={16} />
            <Skeleton width={80} height={16} />
          </div>
        ))}
      </div>
    </div>
  );
}