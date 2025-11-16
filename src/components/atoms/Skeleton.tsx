'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  count?: number;
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  circle = false, 
  count = 1,
  className,
  ...props 
}: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={clsx(
        'skeleton',
        circle && 'rounded-full',
        !circle && 'rounded',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    />
  ));

  return count > 1 ? <div className="space-y-2">{skeletons}</div> : skeletons[0];
}