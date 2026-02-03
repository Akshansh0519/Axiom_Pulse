import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { TopNav } from '@/components/organisms/TopNav';
import { TokenTableContainer } from '@/components/organisms/TokenTable/TokenTableContainer';
import { TokenDetailModal } from '@/components/organisms/TokenDetailModal';
import { FooterBar } from '@/components/organisms/FooterBar';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';
import { LoginCard } from '@/components/organisms/LoginCard';

/**
 * Home Page
 * 
 * Protected route that displays the token discovery dashboard.
 * Unauthenticated users see a login card with SSO options.
 * Authenticated users see the full dashboard.
 * 
 * This demonstrates:
 * - Route protection (IAM - Identity Access Management)
 * - Session-based access control
 * - SSO integration
 */
export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-[#0A0E13] pb-12">
      <TopNav />
      
      {session?.user ? (
        // Authenticated: Show Dashboard
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
      ) : (
        // Unauthenticated: Show Login Card
        <LoginCard />
      )}
      
      <TokenDetailModal />
      <FooterBar />
    </main>
  );
}