'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Token } from '@/types/token';
import { useAppDispatch } from '@/store';
import { openModal } from '@/store/slices/uiSlice';
import { updatePrice } from '@/store/slices/tokensSlice';

interface TokenCardProps {
  token: Token;
}
export function TokenCard({ token }: TokenCardProps) {
  const dispatch = useAppDispatch();
  const [flashClass, setFlashClass] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const mcChange = (Math.random() - 0.5) * 0.06; // -3% to +3%
      
      const volChange = (Math.random() - 0.5) * 0.3; // -15% to +15%
      
      const priceChangePercent = (Math.random() - 0.5) * 0.16; // -8% to +8%
    
      const newMarketCap = token.marketCap * (1 + mcChange);
      const newVolume = token.volume.h24 * (1 + volChange);
      const newPrice = (parseFloat(token.priceUsd) * (1 + priceChangePercent)).toFixed(6);
      
      dispatch(updatePrice({
        id: token.id,
        priceUsd: newPrice,
        marketCap: Math.floor(newMarketCap),
        volume: {
          h24: Math.floor(newVolume),
          h6: Math.floor(newVolume * 0.8),
          h1: Math.floor(newVolume * 0.9),
          m5: Math.floor(newVolume * 0.5),
        },
        priceChange: {
          m5: token.priceChange.m5 + (Math.random() - 0.5) * 30, 
          h1: token.priceChange.h1 + (Math.random() - 0.5) * 55,   
          h6: token.priceChange.h6 + (Math.random() - 0.5) * 50,   
          h24: token.priceChange.h24 + (Math.random() - 0.5) * 40, 
        },
        timestamp: Date.now(),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, token.id, token.marketCap, token.volume.h24, token.priceUsd, token.priceChange]);

  const formatMC = (num: number) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatVolume = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(0)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours >= 1) return `${hours}h`;
    return `${Math.floor(diff / (1000 * 60))}m`;
  };

  // STATIC VALUES - Based on token ID (won't change randomly)
  const stableHash = token.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomTx = Math.floor((stableHash % 900) + 100);
  const randomStars = Math.floor((stableHash % 800) + 200);
  const randomFee = ((stableHash % 10) / 10).toFixed(1);
  const progressWidth = 30 + (stableHash % 40);

  const fallbackImg = `https://ui-avatars.com/api/?name=${token.baseToken.symbol}&size=128&background=random`;
  const borderColors = ['#F85149', '#58A6FF', '#3FB950', '#F0CA4D', '#A371F7', '#F778BA'];
  const randomBorderColor = borderColors[stableHash % borderColors.length];

  return (
    <div 
      onClick={() => dispatch(openModal({ type: 'details', tokenId: token.id }))}
      className={`relative bg-[#0D1117] border border-[#30363D] rounded-lg p-2 hover:border-[#484F58] transition-all cursor-pointer ${flashClass}`}
    >
      
      <div className="flex items-center gap-2 h-[56px]">
        
        <div className="relative w-[56px] h-[56px] flex-shrink-0 rounded-md overflow-hidden border border-[#21262D] bg-[#161B22]" style={{ borderColor: randomBorderColor }}>
          {!imgError ? (
            <Image
              src={token.info?.imageUrl || fallbackImg}
              alt={token.baseToken.symbol}
              fill
              sizes="56px"
              className="object-cover"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg">
              {token.baseToken.symbol.substring(0, 2)}
            </div>
          )}
          <div className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-[#3FB950] rounded-full border border-[#0D1117]" />
        </div>

        {/* Token Name + Time */}
        <div className="flex-shrink-0 w-[100px]">
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className="font-bold text-[13px] text-white">{token.baseToken.symbol}</span>
            <span className="text-[10px] text-[#7D8590] truncate">{token.baseToken.name}</span>
          </div>
          <div className="text-[11px] text-[#3FB950] font-semibold">{getTimeAgo(token.pairCreatedAt)}</div>
        </div>

        {/* Action Icons - Inline */}
        <div className="flex items-center gap-1.5 text-[#7D8590]">
          <button className="hover:text-[#E6EDF3]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" transform="rotate(45 8 8)"/>
            </svg>
          </button>
          <button className="hover:text-[#E6EDF3]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.5 4.5 0 1 0-8.999 0A4.5 4.5 0 0 0 11.5 7Z"/>
            </svg>
          </button>
          
          {/* Counts */}
          <div className="flex items-center gap-0.5 text-[12px]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5Z"/>
            </svg>
            <span>0</span>
          </div>

          <div className="flex items-center gap-0.5 text-[12px]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.834.066c.763.087 1.5.295 2.01.884.505.581.656 1.378.656 2.3 0 .467-.087 1.119-.157 1.637L11.328 5h1.422c.603 0 1.174.085 1.668.333.508.254.911.679 1.137 1.2.453.998.438 2.447.188 4.316l-.04.306c-.105.79-.195 1.473-.313 2.033-.131.63-.315 1.209-.668 1.672C13.97 15.847 12.706 16 11 16c-1.848 0-3.234-.333-4.388-.653-.165-.045-.323-.09-.475-.133-.658-.186-1.2-.34-1.725-.415A1.75 1.75 0 0 1 2.75 16h-1A1.75 1.75 0 0 1 0 14.25v-7.5C0 5.784.784 5 1.75 5h1a1.75 1.75 0 0 1 1.514.872c.258-.105.59-.268.918-.508C5.853 4.874 6.5 4.079 6.5 2.75v-.5c0-1.202.994-2.337 2.334-2.184Z"/>
            </svg>
            <span>0</span>
          </div>

          <div className="flex items-center gap-0.5 text-[12px]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1Z"/>
            </svg>
            <span>0</span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 text-[12px]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="#F0CA4D">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
            </svg>
            <span className="text-white font-semibold">{randomStars}/{randomStars + 62}</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* MC/Volume - Right Aligned */}
        <div className="text-right flex-shrink-0 mr-[6px] w-[78px]">
          <div className="text-[9px] text-[#7D8590] mb-0.5">MC</div>
          <div className="text-[15px] font-bold text-[#58A6FF] mb-0.5 leading-none">
            {formatMC(token.marketCap)}
          </div>
          <div className="text-[12px] text-[#7D8590]">
            V <span className="text-white">{formatVolume(token.volume.h24)}</span>
          </div>
        </div>
      </div>

      {/* Second Row: Progress + Stats */}
      <div className="flex items-center gap-2 mt-[2px] ml-[60px]">
        <div className="flex items-center gap-1 text-[9px] text-[#7D8590]">
          <span>F</span>
          <span>≡</span>
          <span className="text-[#58A6FF]">{randomFee}₄</span>
          <span>TX</span>
          <span className="text-white">{randomTx}</span>
          
          {/* Progress bar */}
          <div className="w-[60px] h-[3px] bg-[#21262D] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#F85149] via-[#F0CA4D] to-[#3FB950]" 
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        <div className="flex-1" />

        {/* Price Changes - Right Aligned */}
        <div className="flex items-center gap-[6px]">
          <div className={`flex items-center gap-0.5 text-[12px] font-bold ${
            token.priceChange.m5 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'
          }`}>
            <span>{token.priceChange.m5 >= 0 ? '↗' : '↘'}</span>
            <span>{Math.abs(token.priceChange.m5).toFixed(0)}%</span>
          </div>

          <div className={`flex items-center gap-0.5 text-[12px] font-bold ${
            token.priceChange.h1 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'
          }`}>
            <span>{token.priceChange.h1 >= 0 ? '↗' : '↘'}</span>
            <span>{Math.abs(token.priceChange.h1).toFixed(0)}%</span>
            <span className="text-[#7D8590] text-[8px]">7d</span>
          </div>

          <div className={`flex items-center gap-0.5 text-[12px] font-bold ${
            token.priceChange.h24 >= 0 ? 'text-[#3FB950]' : 'text-[#F85149]'
          }`}>
            <span>{token.priceChange.h24 >= 0 ? '↗' : '↘'}</span>
            <span>{Math.abs(token.priceChange.h24).toFixed(0)}%</span>
          </div>

          {/* Check marks */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <svg key={i} width="11" height="11" viewBox="0 0 16 16" fill="#3FB950">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/>
              </svg>
            ))}
          </div>

          {/* Circles */}
          <div className="flex items-center gap-1 mr-2">
            <div className="w-3 h-3 rounded-full border border-[#F85149] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F85149]" />
            </div>
            <span className="text-[#7D8590] text-xs">»</span>
            <div className="w-3 h-3 rounded-full border border-[#F0CA4D] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F0CA4D]" />
            </div>
          </div>
        </div>
      </div>

      {/* Address bottom left */}
      <div className="absolute bottom-1 left-2 text-[8px] text-[#484F58] font-mono">
        {token.pairAddress.substring(0, 11)}
      </div>
    </div>
  );
}