'use client';

import { memo } from 'react';
import { TokenIcon } from '@/components/atoms/TokenIcon';
import { clsx } from 'clsx';

interface TokenPairCellProps {
  baseSymbol: string;
  quoteSymbol: string;
  baseName?: string;
  baseIcon?: string;
  pairAddress: string;
  className?: string;
}

export const TokenPairCell = memo(function TokenPairCell({
  baseSymbol,
  quoteSymbol,
  baseName,
  baseIcon,
  pairAddress,
  className,
}: TokenPairCellProps) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <TokenIcon src={baseIcon} symbol={baseSymbol} size={36} />
      
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-text-primary truncate">
            {baseSymbol}
          </span>
          <span className="text-text-tertiary text-sm">/</span>
          <span className="text-text-secondary text-sm">{quoteSymbol}</span>
        </div>
        
        {baseName && (
          <span className="text-xs text-text-tertiary truncate">
            {baseName}
          </span>
        )}
      </div>
    </div>
  );
});