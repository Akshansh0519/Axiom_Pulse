'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  className,
  ...props 
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        'transition-all duration-200',
        
        // Size variants
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
          'px-3 py-1.5 text-base': size === 'lg',
        },
        
        // Color variants
        {
          'bg-price-up-bg text-price-up border border-price-up-border':
            variant === 'success',
          'bg-price-down-bg text-price-down border border-price-down-border':
            variant === 'danger',
          'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30':
            variant === 'warning',
          'bg-blue-500/10 text-blue-400 border border-blue-500/30':
            variant === 'info',
          'bg-surface text-text-secondary border border-border':
            variant === 'neutral',
        },
        
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}