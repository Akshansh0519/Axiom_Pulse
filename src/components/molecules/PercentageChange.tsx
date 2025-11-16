'use client';

import { memo } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/atoms/Icon';

interface PercentageChangeProps {
  value: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const PercentageChange = memo(function PercentageChange({ 
  value, 
  showIcon = true,
  size = 'md'
}: PercentageChangeProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0;

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 font-medium',
        {
          'text-xs': size === 'sm',
          'text-sm': size === 'md',
          'text-base': size === 'lg',
        },
        {
          'text-price-up': isPositive,
          'text-price-down': !isPositive && !isNeutral,
          'text-text-tertiary': isNeutral,
        }
      )}
    >
      {showIcon && !isNeutral && (
        <Icon 
          name={isPositive ? 'arrowUp' : 'arrowDown'} 
          size={size === 'sm' ? 12 : size === 'md' ? 14 : 16}
        />
      )}
      <span>
        {isPositive && '+'}
        {value.toFixed(2)}%
      </span>
    </div>
  );
});