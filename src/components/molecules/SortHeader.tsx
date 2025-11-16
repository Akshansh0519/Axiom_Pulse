'use client';

import { memo } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/atoms/Icon';
import { SortKey, SortDirection } from '@/types/token';

interface SortHeaderProps {
  label: string;
  sortKey: SortKey;
  currentSortKey: SortKey;
  currentDirection: SortDirection;
  onSort: (key: SortKey) => void;
  align?: 'left' | 'center' | 'right';
  tooltip?: string;
}

export const SortHeader = memo(function SortHeader({
  label,
  sortKey,
  currentSortKey,
  currentDirection,
  onSort,
  align = 'left',
  tooltip,
}: SortHeaderProps) {
  const isActive = currentSortKey === sortKey;
  
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={clsx(
        'group flex items-center gap-1.5 px-3 py-2 text-sm font-medium',
        'transition-colors duration-150',
        'hover:text-text-primary focus:outline-none focus-ring',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
        },
        isActive ? 'text-primary-400' : 'text-text-secondary'
      )}
      title={tooltip}
    >
      <span>{label}</span>
      
      <div className={clsx(
        'transition-all duration-200',
        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
      )}>
        {isActive ? (
          <Icon 
            name={currentDirection === 'asc' ? 'arrowUp' : 'arrowDown'} 
            size={14}
            className="text-primary-400"
          />
        ) : (
          <Icon name="sort" size={14} />
        )}
      </div>
    </button>
  );
});