'use client';

import { useAppSelector } from '@/store';

export function FooterBar() {
  const isConnected = useAppSelector(state => state.tokens.isConnected);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D1117] border-t border-[#21262D] px-4 py-2 z-40">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between text-xs">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-2 py-1 bg-[#1C2128] rounded text-[#58A6FF] font-semibold">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
            </svg>
            PRESET 1
          </button>

          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#7D8590">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
            </svg>
            <span className="text-white font-semibold">1</span>
            <span className="text-[#7D8590]">≡</span>
            <span className="text-white font-semibold">0</span>
            <svg width="10" height="10" viewBox="0 0 16 16" fill="#7D8590">
              <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
            </svg>
          </div>

          <button className="p-1 hover:bg-[#1C2128] rounded">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#7D8590">
              <path d="M8 0a8 8 0 110 16A8 8 0 018 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
            </svg>
          </button>

          <button className="px-2 py-1 hover:bg-[#1C2128] rounded text-[#7D8590] flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 7a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1zm-2 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"/>
            </svg>
            Wallet
          </button>

          <button className="px-2 py-1 hover:bg-[#1C2128] rounded text-[#7D8590] flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
            Twitter
          </button>

          <button className="px-2 py-1 hover:bg-[#1C2128] rounded text-[#7D8590] flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Discover
          </button>

          <button className="px-2 py-1 hover:bg-[#1C2128] rounded text-[#7D8590] flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
            </svg>
            Pulse
          </button>

          <span className="text-[#7D8590]">|||</span>
          <span className="text-[#7D8590]">PnL</span>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-yellow-500" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#F0CA4D">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            <span className="text-[#F0CA4D] font-semibold">$95.6K</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#58A6FF">
              <path d="M8 0l8 8-8 8V0z"/>
            </svg>
            <span className="text-[#58A6FF] font-semibold">$3186</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#3FB950">
              <path d="M0 8l8-8v16l-8-8z"/>
            </svg>
            <span className="text-[#3FB950] font-semibold">$140.84</span>
          </div>

          <span className="text-[#7D8590]">$57.9K</span>

          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#7D8590">
              <path d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v13a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-13z"/>
            </svg>
            <span className="text-[#7D8590]">0.0₂2</span>
          </div>

          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#7D8590">
              <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z"/>
            </svg>
            <span className="text-[#7D8590]">0.003</span>
          </div>

          <div className="flex items-center gap-2 px-2 py-1 bg-[#1C2128] rounded">
            <div className="w-2 h-2 bg-[#3FB950] rounded-full animate-pulse" />
            <span className="text-[#3FB950] font-semibold">Connection is stable</span>
          </div>

          <button className="px-2 py-1 hover:bg-[#1C2128] rounded text-[#7D8590]">
            GLOBAL
            <svg className="inline w-3 h-3 ml-1" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}