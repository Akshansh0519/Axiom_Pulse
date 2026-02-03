'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

/**
 * AuthButton Component
 * 
 * Displays a sign-in or sign-out button based on authentication state.
 */
export function AuthButton() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const data = await signOut({ 
        redirect: false,
        callbackUrl: '/' 
      });
      
      // Force page reload to clear server cache
      if (data?.url) {
        window.location.href = data.url;
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
      window.location.href = '/';
    }
  };

  const handleSignIn = () => {
    setIsLoading(true);
    signIn(undefined, { callbackUrl: '/' });
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="w-20 h-8 bg-[#1C2128] rounded animate-pulse" />
    );
  }

  if (session?.user) {
    return (
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="px-4 py-1.5 bg-[#1C2128] hover:bg-[#22272E] border border-[#30363D] rounded text-sm font-medium text-white transition-colors disabled:opacity-50"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="px-4 py-1.5 bg-[#238636] hover:bg-[#2ea043] rounded text-sm font-semibold text-white transition-colors disabled:opacity-50"
    >
      Sign In
    </button>
  );
}