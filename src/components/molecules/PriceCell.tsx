'use client';

import { memo, useMemo } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/atoms/Icon';

interface PriceCellProps {
  price: string;
  priceDirection?: 'up' | 'down' | null;
  showCurrency?: boolean;
}

export const PriceCell = memo(function PriceCell({ 
  price, 
  priceDirection,
  showCurrency = true 
}: PriceCellProps) {
  const formattedPrice = useMemo(() => {
    const numPrice = parseFloat(price);
    
    if (numPrice >= 1000) {
      return numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (numPrice >= 1) {
      return numPrice.toFixed(4);
    } else if (numPrice >= 0.0001) {
      return numPrice.toFixed(6);
    } else {
      return numPrice.toExponential(2);
    }
  }, [price]);

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-sm font-medium',
        'transition-all duration-300 ease-out',
        {
          'animate-flash-green text-price-up': priceDirection === 'up',
          'animate-flash-red text-price-down': priceDirection === 'down',
          'text-text-primary': !priceDirection,
        }
      )}
    >
      {priceDirection && (
        <Icon 
          name={priceDirection === 'up' ? 'trendingUp' : 'trendingDown'} 
          size={14}
          className="flex-shrink-0"
        />
      )}
      <span>
        {showCurrency && '$'}
        {formattedPrice}
      </span>
    </div>
  );
});