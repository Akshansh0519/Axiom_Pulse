'use client';

import { useAppSelector, useAppDispatch } from '@/store';
import { closeModal } from '@/store/slices/uiSlice';
import * as Dialog from '@radix-ui/react-dialog';

export function TokenDetailModal() {
  const dispatch = useAppDispatch();
  const { isOpen, type, tokenId } = useAppSelector(state => state.ui.modal);
  const token = useAppSelector(state => 
    state.tokens.tokens.find(t => t.id === tokenId)
  );

  if (type !== 'details' || !token) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && dispatch(closeModal())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-4xl max-h-[90vh] overflow-auto bg-[#0D1117] border border-[#30363D] rounded-xl shadow-2xl p-6">
          
          {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={token.info?.imageUrl || `https://ui-avatars.com/api/?name=${token.baseToken.symbol}`} 
                  alt={token.baseToken.symbol}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <Dialog.Title asChild>
                    <h2 className="text-2xl font-bold text-white">{token.baseToken.symbol}</h2>
                  </Dialog.Title>
                  <p className="text-[#7D8590]">{token.baseToken.name}</p>
                </div>
              </div>

            <Dialog.Close asChild>
              <button className="w-10 h-10 flex items-center justify-center hover:bg-[#1C2128] rounded-lg transition-colors">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="#8B949E">
                  <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
                </svg>
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
                <h3 className="text-[#7D8590] text-sm mb-2">Price</h3>
                <p className="text-2xl font-bold text-white">${parseFloat(token.priceUsd).toFixed(6)}</p>
              </div>

              <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
                <h3 className="text-[#7D8590] text-sm mb-2">Market Cap</h3>
                <p className="text-xl font-bold text-[#58A6FF]">
                  ${token.marketCap >= 1000000 
                    ? `${(token.marketCap / 1000000).toFixed(2)}M` 
                    : `${(token.marketCap / 1000).toFixed(2)}K`}
                </p>
              </div>

              <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
                <h3 className="text-[#7D8590] text-sm mb-2">24h Volume</h3>
                <p className="text-xl font-bold text-white">
                  ${token.volume.h24 >= 1000000 
                    ? `${(token.volume.h24 / 1000000).toFixed(2)}M` 
                    : `${(token.volume.h24 / 1000).toFixed(2)}K`}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
                <h3 className="text-[#7D8590] text-sm mb-2">24h Change</h3>
                <p className={`text-2xl font-bold ${token.priceChange.h24 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
                  {token.priceChange.h24 >= 0 ? '+' : ''}{token.priceChange.h24.toFixed(2)}%
                </p>
              </div>

              <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
                <h3 className="text-[#7D8590] text-sm mb-2">Liquidity</h3>
                <p className="text-xl font-bold text-white">
                  ${token.liquidity.usd >= 1000000 
                    ? `${(token.liquidity.usd / 1000000).toFixed(2)}M` 
                    : `${(token.liquidity.usd / 1000).toFixed(2)}K`}
                </p>
              </div>

              <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
                <h3 className="text-[#7D8590] text-sm mb-2">Pair Address</h3>
                <p className="text-sm font-mono text-[#58A6FF] break-all">{token.pairAddress}</p>
              </div>
            </div>
          </div>

          {/* Price Changes Grid */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] text-center">
              <p className="text-[#7D8590] text-xs mb-1">5m</p>
              <p className={`text-lg font-bold ${token.priceChange.m5 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
                {token.priceChange.m5 >= 0 ? '+' : ''}{token.priceChange.m5.toFixed(1)}%
              </p>
            </div>
            <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] text-center">
              <p className="text-[#7D8590] text-xs mb-1">1h</p>
              <p className={`text-lg font-bold ${token.priceChange.h1 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
                {token.priceChange.h1 >= 0 ? '+' : ''}{token.priceChange.h1.toFixed(1)}%
              </p>
            </div>
            <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] text-center">
              <p className="text-[#7D8590] text-xs mb-1">6h</p>
              <p className={`text-lg font-bold ${token.priceChange.h6 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
                {token.priceChange.h6 >= 0 ? '+' : ''}{token.priceChange.h6.toFixed(1)}%
              </p>
            </div>
            <div className="bg-[#161B22] p-3 rounded-lg border border-[#30363D] text-center">
              <p className="text-[#7D8590] text-xs mb-1">24h</p>
              <p className={`text-lg font-bold ${token.priceChange.h24 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'}`}>
                {token.priceChange.h24 >= 0 ? '+' : ''}{token.priceChange.h24.toFixed(1)}%
              </p>
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}