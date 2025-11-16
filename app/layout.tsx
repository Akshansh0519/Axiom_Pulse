import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { TokenDetailModal } from '@/components/organisms/TokenDetailModal';
export const metadata: Metadata = {
  title: 'Axiom Pulse - Token Discovery',
  description: 'Real-time cryptocurrency token discovery and trading platform',
  viewport: 'width=device-width, initial-scale=1',
};

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            {children}
            <TokenDetailModal />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}