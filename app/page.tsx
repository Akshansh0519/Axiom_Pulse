import { Suspense } from 'react';
import { TopNav } from '@/components/organisms/TopNav';
import { TokenTableContainer } from '@/components/organisms/TokenTable/TokenTableContainer';
import { TokenDetailModal } from '@/components/organisms/TokenDetailModal';
import { FooterBar } from '@/components/organisms/FooterBar';
import { TableSkeleton } from '@/components/molecules/TableSkeleton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0E13] pb-12">
      <TopNav />
      <div className="mx-auto px-4 py-4">
        <Suspense fallback={<TableSkeleton rows={20} columns={3} />}>
          <TokenTableContainer />
        </Suspense>
      </div>
      <TokenDetailModal />
      <FooterBar />
    </main>
  );
}