'use client';

import { memo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setSort } from '@/store/slices/tokensSlice';
import { toggleSortPopover, closeSortPopover } from '@/store/slices/uiSlice';
import { TokenCard } from './TokenCard';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Popover from '@radix-ui/react-popover';

const ColumnHeader = memo(function ColumnHeader({ 
  title, 
  count,
  columnId,
}: { 
  title: string; 
  count: number;
  columnId: string;
}) {
  const dispatch = useAppDispatch();
  const sortPopover = useAppSelector(state => state.ui.sortPopover);
  const currentSort = useAppSelector(state => state.tokens.sort);

  const isOpen = sortPopover.isOpen && sortPopover.columnId === columnId;

  const handleSort = useCallback((key: string) => {
    console.log('🎯 SORTING BY:', key);
    dispatch(setSort({ key: key as any }));
    dispatch(closeSortPopover());
  }, [dispatch]);

  const handleToggle = useCallback((open: boolean) => {
    if (open) {
      dispatch(toggleSortPopover(columnId));
    } else {
      dispatch(closeSortPopover());
    }
  }, [dispatch, columnId]);

  return (
    <div className="flex items-center justify-between px-4 py-4 mb-2 bg-[#0D1117]">
      {/* Left: Title Only */}
      <h2 className="text-white text-2xl font-bold">{title}</h2>
      
      {/* Right: Dark Circular Container */}
      <div className="flex items-center gap-3 bg-[#161B22] border border-[#30363D] rounded-full px-4 py-2">
        {/* Lightning Counter */}
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#F0CA4D">
            <path d="M8.5 1.5l-6 8h4.5l-.5 5 6-8h-4.5l.5-5z"/>
          </svg>
          <span className="text-white text-sm font-semibold">{count}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[#30363D]" />

        {/* Rainbow Menu Icon */}
        <button className="hover:opacity-80 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="4" width="16" height="2" fill="url(#gradient1)" rx="1"/>
            <rect x="2" y="9" width="16" height="2" fill="url(#gradient2)" rx="1"/>
            <rect x="2" y="14" width="16" height="2" fill="url(#gradient3)" rx="1"/>
            <defs>
              <linearGradient id="gradient1" x1="2" y1="5" x2="18" y2="5">
                <stop offset="0%" stopColor="#FF6B6B"/>
                <stop offset="50%" stopColor="#4ECDC4"/>
                <stop offset="100%" stopColor="#45B7D1"/>
              </linearGradient>
              <linearGradient id="gradient2" x1="2" y1="10" x2="18" y2="10">
                <stop offset="0%" stopColor="#4ECDC4"/>
                <stop offset="50%" stopColor="#45B7D1"/>
                <stop offset="100%" stopColor="#96CEB4"/>
              </linearGradient>
              <linearGradient id="gradient3" x1="2" y1="15" x2="18" y2="15">
                <stop offset="0%" stopColor="#45B7D1"/>
                <stop offset="50%" stopColor="#96CEB4"/>
                <stop offset="100%" stopColor="#FFEAA7"/>
              </linearGradient>
            </defs>
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#30363D]" />

        {/* P1, P2, P3 */}
        <div className="flex items-center gap-3">
          <span className="text-[#58A6FF] text-sm font-bold">P1</span>
          <span className="text-[#7D8590] text-sm font-medium">P2</span>
          <span className="text-[#7D8590] text-sm font-medium">P3</span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[#30363D]" />

        {/* Plus Icon with Dropdown - THIS IS THE KEY PART */}
        <Popover.Root open={isOpen} onOpenChange={handleToggle}>
          <Popover.Trigger asChild>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent clicks
                console.log('🔘 Plus button clicked, current state:', isOpen);
              }}
              className={`text-[#7D8590] hover:text-white transition-colors p-1 ${isOpen ? 'text-white bg-[#1C2128] rounded' : ''}`}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 010 1.5H8.5v4.25a.75.75 0 01-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"/>
              </svg>
            </button>
          </Popover.Trigger>
          
          <Popover.Portal>
            <Popover.Content 
              className="bg-[#161B22] border border-[#30363D] rounded-lg p-2 w-56 z-[9999] shadow-2xl"
              sideOffset={8}
              align="end"
              side="bottom"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="space-y-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSort('volume.h24');
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded transition-all ${
                    currentSort.key === 'volume.h24' 
                      ? 'bg-[#1C2128] text-[#58A6FF] font-semibold shadow-md' 
                      : 'text-[#E6EDF3] hover:bg-[#1C2128]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>📊 Sort by Volume</span>
                    {currentSort.key === 'volume.h24' && (
                      <span className="text-xs font-bold">
                        {currentSort.direction === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </div>
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSort('priceChange.h24');
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded transition-all ${
                    currentSort.key === 'priceChange.h24' 
                      ? 'bg-[#1C2128] text-[#58A6FF] font-semibold shadow-md' 
                      : 'text-[#E6EDF3] hover:bg-[#1C2128]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>📈 Sort by 24h Change</span>
                    {currentSort.key === 'priceChange.h24' && (
                      <span className="text-xs font-bold">
                        {currentSort.direction === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </div>
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSort('marketCap');
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded transition-all ${
                    currentSort.key === 'marketCap' 
                      ? 'bg-[#1C2128] text-[#58A6FF] font-semibold shadow-md' 
                      : 'text-[#E6EDF3] hover:bg-[#1C2128]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>💰 Sort by Market Cap</span>
                    {currentSort.key === 'marketCap' && (
                      <span className="text-xs font-bold">
                        {currentSort.direction === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </div>
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSort('pairCreatedAt');
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded transition-all ${
                    currentSort.key === 'pairCreatedAt' 
                      ? 'bg-[#1C2128] text-[#58A6FF] font-semibold shadow-md' 
                      : 'text-[#E6EDF3] hover:bg-[#1C2128]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>🕐 Sort by Age</span>
                    {currentSort.key === 'pairCreatedAt' && (
                      <span className="text-xs font-bold">
                        {currentSort.direction === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </div>
                </button>

                <div className="h-px bg-[#30363D] my-1" />
                
                <div className="px-3 py-1.5 text-[10px] text-[#7D8590]">
                  Sorting: {currentSort.key} ({currentSort.direction})
                </div>
              </div>
              <Popover.Arrow className="fill-[#30363D]" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
});

export function TokenCardGrid() {
  const allTokens = useAppSelector(state => state.tokens.filteredTokens);

  const newPairs = allTokens.filter(t => t.category === 'new-pairs');
  const finalStretch = allTokens.filter(t => t.category === 'final-stretch');
  const migrated = allTokens.filter(t => t.category === 'migrated');

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="grid grid-cols-3 gap-0">
        {/* New Pairs Column */}
        <div className="border-r border-[#21262D]">
          <ColumnHeader title="New Pairs" count={newPairs.length} columnId="new-pairs" />
          <div className="px-3 space-y-0 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
            {newPairs.map(token => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>

        {/* Final Stretch Column */}
        <div className="border-r border-[#21262D]">
          <ColumnHeader title="Final Stretch" count={finalStretch.length} columnId="final-stretch" />
          <div className="px-3 space-y-0 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
            {finalStretch.map(token => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>

        {/* Migrated Column */}
        <div>
          <ColumnHeader title="Migrated" count={migrated.length} columnId="migrated" />
          <div className="px-3 space-y-0 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden custom-scrollbar">
            {migrated.map(token => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
}