'use client';

import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import { TokenTableContainer } from '@/components/organisms/TokenTable/TokenTableContainer';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { LoginCard } from '@/components/organisms/LoginCard';

/**
 * AuthenticatedContent Component
 * 
 * Client-side component that handles auth state reactively.
 * This ensures sign-out reflects immediately without full page refresh.
 * 
 * Uses useSession() hook which:
 * - Subscribes to session changes
 * - Updates UI immediately when session changes
 * - Works with NextAuth.js signOut()
 */
export function AuthenticatedContent() {
  const { data: session, status } = useSession();

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="mx-auto px-4 py-4">
        <div className="mb-4 px-4 py-3 bg-[#161B22] border border-[#30363D] rounded-lg animate-pulse">
          <div className="h-4 w-64 bg-[#30363D] rounded"></div>
        </div>
        <TableSkeleton rows={10} columns={3} />
      </div>
    );
  }

  // Authenticated: Show Dashboard
  if (session?.user) {
    return (
      <div className="mx-auto px-4 py-4">
        {/* Welcome Banner */}
        <div className="mb-4 px-4 py-3 bg-gradient-to-r from-[#238636]/10 to-transparent border border-[#238636]/20 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#238636] rounded-full animate-pulse" />
            <span className="text-sm text-[#8B949E]">
              Welcome back, <span className="text-white font-medium">{session.user.name}</span>! 
              You&apos;re viewing the live token discovery dashboard.
            </span>
          </div>
        </div>
        
        <Suspense fallback={<TableSkeleton rows={20} columns={3} />}>
          <TokenTableContainer />
        </Suspense>
      </div>
    );
  }

  // Unauthenticated: Show Login Card
  return <LoginCard />;
}