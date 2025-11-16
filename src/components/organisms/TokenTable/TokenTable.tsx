'use client';

import { memo, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSort } from '@/store/slices/tokensSlice';
import { Token, SortKey } from '@/types/token';
import { SortHeader } from '@/components/molecules/SortHeader';
import { TokenRow } from './TokenRow';

interface TokenTableProps {
  tokens: Token[];
}

interface ColumnConfig {
  key: string;
  label: string;
  sortKey: SortKey | null;
  align: 'left' | 'center' | 'right';
  width: string;
}

export const TokenTable = memo(function TokenTable({ tokens }: TokenTableProps) {
  const dispatch = useAppDispatch();
  const { key: sortKey, direction: sortDirection } = useAppSelector(state => state.tokens.sort);
  const visibleColumns = useAppSelector(state => state.ui.visibleColumns);

  const handleSort = (key: SortKey) => {
    dispatch(setSort({ key }));
  };

  const columnConfig = useMemo<ColumnConfig[]>(() => {
    const allColumns: ColumnConfig[] = [
      { key: 'pair', label: 'Pair', sortKey: null, align: 'left', width: '318px' },
      { key: 'price', label: 'Price', sortKey: 'priceUsd', align: 'right', width: '118px' },
      { key: 'priceChange5m', label: '5m', sortKey: 'priceChange.m5', align: 'right', width: '90px' },
      { key: 'priceChange1h', label: '1h', sortKey: 'priceChange.h1', align: 'right', width: '90px' },
      { key: 'priceChange24h', label: '24h', sortKey: 'priceChange.h24', align: 'right', width: '90px' },
      { key: 'volume24h', label: 'Volume 24h', sortKey: 'volume.h24', align: 'right', width: '140px' },
      { key: 'liquidity', label: 'Liquidity', sortKey: 'liquidity.usd', align: 'right', width: '140px' },
      { key: 'fdv', label: 'FDV', sortKey: 'fdv', align: 'right', width: '120px' },
      { key: 'age', label: 'Age', sortKey: 'pairCreatedAt', align: 'right', width: '100px' },
    ];
    
    return allColumns.filter(col => visibleColumns.includes(col.key));
  }, [visibleColumns]);

  return (
    <div className="glass-heavy rounded-xl overflow-hidden border border-border">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-background-secondary/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center">
          {columnConfig.map((col) => (
            <div
              key={col.key}
              style={{ width: col.width, minWidth: col.width }}
              className="flex-shrink-0"
            >
              {col.sortKey ? (
                <SortHeader
                  label={col.label}
                  sortKey={col.sortKey}
                  currentSortKey={sortKey}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                  align={col.align}
                />
              ) : (
                <div className={`px-3 py-3 text-sm font-medium text-text-secondary ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}>
                  {col.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-auto max-h-[600px]">
        {tokens.length === 0 ? (
          <div className="p-12 text-center text-text-secondary">
            No tokens found
          </div>
        ) : (
          <div className="divide-y divide-border">
            {tokens.map((token) => (
              <TokenRow key={token.id} token={token} columnConfig={columnConfig} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});