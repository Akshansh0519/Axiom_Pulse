'use client';

import { useSession } from 'next-auth/react';
import { AuthButton } from '../atoms/AuthButton';
import { UserAvatar } from '../atoms/UserAvatar';

/**
 * TopNav Component
 *
 * Responsive navigation bar with:
 * - Progressive disclosure of nav items
 * - Overflow-safe layout
 * - Auth-aware UI
 */
export function TopNav() {
  const { data: session } = useSession();

  return (
    <div className="w-full bg-[#000000]">
      <div className="border-b border-[#21262D]">
        <div className="max-w-[1920px] mx-auto px-4 h-12 flex items-center justify-between gap-4 overflow-hidden">

          {/* LEFT: Logo + Primary Navigation */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Logo */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUEyG95t-6you69IYNRvcahYjZfjNwJxH2A&s"
              alt="AXIOM Pro"
              className="h-10 w-auto object-contain"
            />

            {/* Primary Nav (Desktop only) */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="text-[#8B949E] hover:text-white text-sm font-medium">
                Discover
              </button>
              <button className="text-[#58A6FF] text-sm font-semibold">
                Pulse
              </button>
              <button className="text-[#8B949E] hover:text-white text-sm font-medium">
                Trackers
              </button>
              <button className="text-[#8B949E] hover:text-white text-sm font-medium">
                Perpetuals
              </button>

              {/* Secondary items progressively revealed */}
              <button className="hidden xl:block text-[#8B949E] hover:text-white text-sm font-medium">
                Yield
              </button>
              <button className="hidden xl:block text-[#8B949E] hover:text-white text-sm font-medium">
                Vision
              </button>
              <button className="hidden 2xl:block text-[#8B949E] hover:text-white text-sm font-medium">
                Portfolio
              </button>
            </div>
          </div>

          {/* RIGHT: Search + Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Search (responsive width) */}
            <div className="relative hidden sm:block">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                fill="#8B949E"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by token or CA..."
                className="
                  w-40
                  md:w-48
                  lg:w-56
                  xl:w-64
                  pl-10 pr-4 py-1.5
                  bg-transparent
                  border border-[#30363D]
                  rounded
                  text-sm text-white
                  placeholder-[#8B949E]
                  focus:outline-none focus:border-[#58A6FF]
                "
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] text-xs">
                /
              </span>
            </div>

            {/* Chain Selector (hide on very small screens) */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1C2128] border border-[#30363D] rounded text-sm text-white">
              <span className="text-[#8B949E]">≡</span>
              <span>SOL</span>
              <svg
                className="w-3 h-3 text-[#8B949E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Deposit (desktop priority) */}
            <button className="hidden md:block px-4 py-1.5 bg-[#238636] hover:bg-[#2ea043] rounded text-sm font-semibold text-white">
              Deposit
            </button>

            {/* Auth Section */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#30363D]">
              {session?.user ? <UserAvatar /> : <AuthButton />}
            </div>

            {/* Hamburger / Overflow Menu (mobile & tablet) */}
            <button className="lg:hidden px-2 py-1.5 text-white text-lg">
              ☰
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
