'use client';

import { useAppSelector, useAppDispatch } from '@/store';
import { closeModal } from '@/store/slices/uiSlice';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';

export function TokenDetailModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.ui.isModalOpen);
  const tokenId = useAppSelector(state => state.ui.selectedTokenId);
  const token = useAppSelector(state => 
    state.tokens.tokens.find(t => t.id === tokenId)
  );

  if (!token) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => dispatch(closeModal())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D1117] border border-[#30363D] rounded-xl p-6 w-[90vw] max-w-3xl max-h-[85vh] overflow-y-auto z-50 animate-in fade-in zoom-in">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#30363D]">
              <Image
                src={token.info?.imageUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${token.baseToken.symbol}`}
                alt={token.baseToken.symbol}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            <div className="flex-1">
              <Dialog.Title className="text-2xl font-bold text-white mb-1">
                {token.baseToken.symbol} / {token.quoteToken.symbol}
              </Dialog.Title>
              <Dialog.Description className="text-[#8B949E]">
                {token.baseToken.name}
              </Dialog.Description>
            </div>

            <Dialog.Close className="p-2 hover:bg-[#1C2128] rounded-lg transition-colors">
              <svg className="w-5 h-5 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </Dialog.Close>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="text-[#8B949E] text-sm mb-1">Price</div>
              <div className="text-white text-2xl font-bold">${parseFloat(token.priceUsd).toFixed(4)}</div>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="text-[#8B949E] text-sm mb-1">Market Cap</div>
              <div className="text-white text-2xl font-bold">
                ${(token.marketCap / 1000000).toFixed(2)}M
              </div>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="text-[#8B949E] text-sm mb-1">24h Volume</div>
              <div className="text-white text-2xl font-bold">
                ${(token.volume.h24 / 1000).toFixed(2)}K
              </div>
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
              <div className="text-[#8B949E] text-sm mb-1">Liquidity</div>
              <div className="text-white text-2xl font-bold">
                ${(token.liquidity.usd / 1000).toFixed(2)}K
              </div>
            </div>
          </div>

          {/* Price Changes */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-3">Price Changes</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-[#8B949E] text-xs mb-1">5m</div>
                <div className={`font-bold ${token.priceChange.m5 >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {token.priceChange.m5 >= 0 ? '+' : ''}{token.priceChange.m5.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[#8B949E] text-xs mb-1">1h</div>
                <div className={`font-bold ${token.priceChange.h1 >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {token.priceChange.h1 >= 0 ? '+' : ''}{token.priceChange.h1.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[#8B949E] text-xs mb-1">6h</div>
                <div className={`font-bold ${token.priceChange.h6 >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {token.priceChange.h6 >= 0 ? '+' : ''}{token.priceChange.h6.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-[#8B949E] text-xs mb-1">24h</div>
                <div className={`font-bold ${token.priceChange.h24 >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {token.priceChange.h24 >= 0 ? '+' : ''}{token.priceChange.h24.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 rounded-lg transition-colors">
              Trade Now
            </button>
            <button className="flex-1 bg-[#161B22] hover:bg-[#1C2128] border border-[#30363D] text-white font-semibold py-3 rounded-lg transition-colors">
              View Chart
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}