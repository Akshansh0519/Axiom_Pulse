'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Token } from '@/types/token';
import { useAppDispatch } from '@/store';
import { openModal } from '@/store/slices/uiSlice';
import { formatNumber, formatDistanceToNow } from '@/lib/utils';

interface ColumnConfig {
  key: string;
  label: string;
  sortKey: string | null;
  align: 'left' | 'right' | 'center';
  width: string;
}

interface TokenRowProps {
  token: Token;
  columnConfig: ColumnConfig[];
}

export const TokenRow = memo(function TokenRow({ token }: TokenRowProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal({ type: 'details', tokenId: token.id }));
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green';
    if (change < 0) return 'text-red';
    return 'text-text-secondary';
  };

  const formatChange = (change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  // Get token image with fallback
  const getTokenImage = () => {
    if (token.info?.imageUrl) {
      return token.info.imageUrl;
    }
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${token.baseToken.symbol}`;
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center px-6 py-4 hover:bg-surface transition-colors text-left group"
    >
      {/* Pair (280px) */}
      <div className="w-[280px] min-w-[280px] flex items-center gap-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <Image
            src={getTokenImage()}
            alt={token.baseToken.symbol}
            width={40}
            height={40}
            className="rounded-full"
            unoptimized
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${token.baseToken.symbol}`;
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white truncate">{token.baseToken.symbol}</span>
            <span className="text-text-tertiary text-sm">/ {token.quoteToken.symbol}</span>
          </div>
          <p className="text-xs text-text-tertiary truncate">{token.baseToken.name}</p>
        </div>
      </div>

      {/* Price (120px) */}
      <div className="w-[120px] min-w-[120px]">
        <span className="text-white font-medium">${formatNumber(parseFloat(token.priceUsd), 4)}</span>
      </div>

      {/* 5m Change (100px) */}
      <div className="w-[100px] min-w-[100px]">
        <span className={`font-medium ${getPriceChangeColor(token.priceChange.m5)}`}>
          {formatChange(token.priceChange.m5)}
        </span>
      </div>

      {/* 1h Change (100px) */}
      <div className="w-[100px] min-w-[100px]">
        <span className={`font-medium ${getPriceChangeColor(token.priceChange.h1)}`}>
          {formatChange(token.priceChange.h1)}
        </span>
      </div>

      {/* 24h Change (100px) */}
      <div className="w-[100px] min-w-[100px]">
        <span className={`font-medium ${getPriceChangeColor(token.priceChange.h24)}`}>
          {formatChange(token.priceChange.h24)}
        </span>
      </div>

      {/* Volume (140px) */}
      <div className="w-[140px] min-w-[140px]">
        <span className="text-white">${(token.volume.h24 / 1000).toFixed(2)}K</span>
      </div>

      {/* Liquidity (140px) */}
      <div className="w-[140px] min-w-[140px]">
        <span className="text-white">${(token.liquidity.usd / 1000).toFixed(2)}K</span>
      </div>

      {/* FDV (120px) */}
      <div className="w-[120px] min-w-[120px]">
        <span className="text-white">${(token.fdv / 1000000).toFixed(2)}M</span>
      </div>

      {/* Age (100px) */}
      <div className="w-[100px] min-w-[100px]">
        <span className="text-text-secondary text-sm">{formatDistanceToNow(token.pairCreatedAt)}</span>
      </div>
    </button>
  );
});