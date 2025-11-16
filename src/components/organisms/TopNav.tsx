'use client';

export function TopNav() {
  return (
    <div className="w-full bg-[#000000]">
      {/* Top Navigation Bar - Navigation Links */}
      <div className="border-b border-[#21262D]">
        <div className="max-w-[1920px] mx-auto px-4 h-12 flex items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center gap-6">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUEyG95t-6you69IYNRvcahYjZfjNwJxH2A&s" 
              alt="AXIOM Pro" 
              className="h-20 w-auto  object-contain"
            />

            <button className="text-[#8B949E] hover:text-white text-sm font-medium transition-colors">
              Discover
            </button>
            <button className="text-[#58A6FF] text-sm font-semibold">
              Pulse
            </button>
            <button className="text-[#8B949E] hover:text-white text-sm font-medium transition-colors">
              Trackers
            </button>
            <button className="text-[#8B949E] hover:text-white text-sm font-medium transition-colors">
              Perpetuals
            </button>
            <button className="text-[#8B949E] hover:text-white text-sm font-medium transition-colors">
              Yield
            </button>
            <button className="text-[#8B949E] hover:text-white text-sm font-medium transition-colors">
              Vision
            </button>
            <button className="text-[#8B949E] hover:text-white text-sm font-medium transition-colors">
              Portfolio
            </button>
          </div>

          {/* Right: Search & Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="#8B949E" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z" />
              </svg>
              <input
                type="text"
                placeholder="Search by token or CA..."
                className="w-64 pl-10 pr-4 py-1.5 bg-transparent border border-[#30363D] rounded text-sm text-white placeholder-[#8B949E] focus:outline-none focus:border-[#58A6FF] transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] text-xs">/</span>
            </div>

            {/* SOL Dropdown */}
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1C2128] hover:bg-[#22272E] border border-[#30363D] rounded text-sm font-medium text-white transition-colors">
              <span className="text-sm">≡</span>
              <span>SOL</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#8B949E">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>

            {/* Deposit */}
            <button className="px-4 py-1.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold rounded transition-colors">
              Deposit
            </button>

            {/* Star/Bookmark */}
            <button className="p-2 hover:bg-[#1C2128] rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B949E">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-[#1C2128] rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B949E">
                <path d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z" />
                <path d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5z" />
              </svg>
            </button>

            {/* Settings */}
            <button className="p-2 hover:bg-[#1C2128] rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B949E">
                <path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0z" />
              </svg>
            </button>

            {/* Wallet */}
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1C2128] border border-[#30363D] rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B949E">
                <path d="M2 6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="text-white text-sm font-semibold">1</span>
              <span className="text-[#8B949E]">≡</span>
              <span className="text-white text-sm font-semibold">0</span>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#8B949E">
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>

            {/* User Profile */}
            <button className="p-2 hover:bg-[#1C2128] rounded transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#8B949E">
                <path d="M10.561 8.073a6.005 6.005 0 003.432 5.142.75.75 0 11-.686 1.335 7.5 7.5 0 01-4.561-4.561.75.75 0 00-1.42 0 7.5 7.5 0 01-4.561 4.561.75.75 0 01-.686-1.335 6.005 6.005 0 003.432-5.142 2.5 2.5 0 10-1.11 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar - Pulse Controls */}
      <div className="border-b border-[#30363D]">
        <div className="max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Pulse + Chain Icons */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">Pulse</span>
            <div className="flex items-center gap-1.5">
              {/* SOL Icon */}
              <div className="w-8 h-8 bg-[#201010] rounded flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
                <img src="https://axiom.trade/images/sol-fill.svg" alt="Solana" className="w-5 h-5" />
              </div>
              {/* BNB Icon */}
              <div className="w-8 h-8 bg-[#000000] rounded flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer">
                <img src="https://axiom.trade/images/bnb-fill.svg" alt="BNB" className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            {/* Help */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1C2128] rounded transition-colors">
              <span className="text-[#8B949E]">?</span>
            </button>

            {/* Display */}
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1C2128] hover:bg-[#22272E] rounded-lg border border-[#30363D] transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="text-sm text-white font-medium">Display</span>
              <svg className="w-3 h-3 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>

            {/* Bookmark */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1C2128] rounded transition-colors">
              <svg className="w-5 h-5 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>

            {/* Messages */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1C2128] rounded transition-colors">
              <svg className="w-5 h-5 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              </svg>
            </button>

            {/* Audio */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1C2128] rounded transition-colors">
              <svg className="w-5 h-5 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </button>

            {/* Settings */}
            <button className="w-8 h-8 flex items-center justify-center hover:bg-[#1C2128] rounded transition-colors">
              <svg className="w-5 h-5 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Folders/Wallet Display */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1C2128] rounded-lg border border-[#30363D]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span className="text-sm text-white font-medium">1</span>
              </div>
              <div className="w-px h-4 bg-[#30363D]"></div>
              <div className="flex items-center gap-1.5">
                <img src="https://axiom.trade/images/sol-fill.svg" alt="Solana" className="w-5 h-5" />
                <span className="text-sm text-white font-medium">0</span>
              </div>
              <svg className="w-5 h-5 text-[#8B949E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}