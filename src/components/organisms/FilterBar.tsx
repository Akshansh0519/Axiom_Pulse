'use client';

import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setFilters } from '@/store/slices/tokensSlice';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';
import * as Popover from '@radix-ui/react-popover';

type CategoryValue = 'all' | 'new-pairs' | 'final-stretch' | 'migrated';
type IconName = 'chart' | 'fire' | 'lightning' | 'rocket' | 'search' | 'filter';

interface Category {
  value: CategoryValue;
  label: string;
  icon: IconName;
}

export function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.tokens.filters);
  const [searchInput, setSearchInput] = useState(filters.searchQuery);

  const categories: Category[] = [
    { value: 'all', label: 'All Pairs', icon: 'chart' },
    { value: 'new-pairs', label: 'New Pairs', icon: 'fire' },
    { value: 'final-stretch', label: 'Final Stretch', icon: 'lightning' },
    { value: 'migrated', label: 'Migrated', icon: 'rocket' },
  ];

  const handleCategoryChange = useCallback((category: CategoryValue) => {
    dispatch(setFilters({ category }));
  }, [dispatch]);

  const handleSearch = useCallback((query: string) => {
    setSearchInput(query);
    dispatch(setFilters({ searchQuery: query }));
  }, [dispatch]);

  return (
    <div className="glass-heavy rounded-xl p-4 border border-border">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="search" 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by token name, symbol, or address..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className={clsx(
                'w-full pl-10 pr-4 py-2.5 rounded-lg',
                'bg-surface border border-border',
                'text-text-primary placeholder-text-tertiary',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'transition-all duration-200'
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap',
                'transition-all duration-200 border',
                filters.category === cat.value
                  ? 'bg-primary-600 text-white border-primary-600 shadow-glow-blue'
                  : 'bg-surface text-text-secondary border-border hover:bg-surface-hover hover:text-text-primary'
              )}
            >
              <Icon name={cat.icon} size={16} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="secondary" className="relative">
              <Icon name="filter" size={16} className="mr-2" />
              Filters
              {(filters.minVolume > 0 || filters.minLiquidity > 0) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </Button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className="z-50 w-80 rounded-xl bg-surface border border-border shadow-2xl animate-scale-in"
              sideOffset={5}
              align="end"
            >
              <div className="p-4 space-y-4">
                <h3 className="font-semibold text-text-primary">Advanced Filters</h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Minimum Volume (24h)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter minimum volume"
                    value={filters.minVolume || ''}
                    onChange={(e) => dispatch(setFilters({ minVolume: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">
                    Minimum Liquidity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter minimum liquidity"
                    value={filters.minLiquidity || ''}
                    onChange={(e) => dispatch(setFilters({ minLiquidity: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => dispatch(setFilters({ minVolume: 0, minLiquidity: 0 }))}
                >
                  Reset Filters
                </Button>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}