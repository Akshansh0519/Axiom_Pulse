'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * UserAvatar Component
 * 
 * Displays the authenticated user's avatar with a dropdown menu.
 * Shows user info and sign-out option.
 */
export function UserAvatar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateDropdownPosition = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener('resize', updateDropdownPosition);
      window.addEventListener('scroll', updateDropdownPosition, true);
    }
    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition, true);
    };
  }, [isOpen, updateDropdownPosition]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        buttonRef.current && 
        !buttonRef.current.contains(target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!session?.user) return null;

  const userImage = session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'User')}&background=238636&color=fff`;
  const userName = session.user.name || 'User';
  const userEmail = session.user.email || '';

  // ✅ FIXED: Sign out with hard page reload to clear server cache
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSigningOut(true);
    setIsOpen(false);
    
    try {
      // Call signOut with redirect:false so we control the redirect
      const data = await signOut({ 
        redirect: true 
      });
      
      // Force a full page reload to clear server-side cache
      // This is the only reliable way with Next.js App Router + Server Components
      if (data?.url) {
        window.location.href = data.url;
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback: force reload anyway
      window.location.href = '/';
    }
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const dropdownContent = (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: `${dropdownPosition.top}px`,
        right: `${dropdownPosition.right}px`,
        zIndex: 9999,
      }}
      className="w-64 bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl overflow-hidden"
    >
      {/* User Info Section */}
      <div className="px-4 py-3 border-b border-[#30363D] bg-[#0D1117]">
        <div className="flex items-center gap-3">
          <img
            src={userImage}
            alt={userName}
            className="w-10 h-10 rounded-full border-2 border-[#30363D]"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {userName}
            </p>
            <p className="text-xs text-[#8B949E] truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="px-4 py-2 border-b border-[#30363D]">
        <div className="flex items-center gap-2 text-xs text-[#8B949E]">
          <svg className="w-4 h-4 text-[#238636]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Authenticated via SSO</span>
        </div>
      </div>

      {/* Actions */}
      <div className="py-1">
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full px-4 py-3 text-left text-sm text-[#F85149] hover:bg-[#1C2128] transition-colors flex items-center gap-3 disabled:opacity-50"
        >
          {isSigningOut ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing out...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign out</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        disabled={isSigningOut}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`
          flex items-center gap-2 px-2 py-1 rounded transition-colors
          ${isOpen ? 'bg-[#1C2128]' : 'hover:bg-[#1C2128]'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isSigningOut ? (
          <div className="w-8 h-8 rounded-full border-2 border-[#30363D] bg-[#1C2128] flex items-center justify-center">
            <svg className="w-4 h-4 animate-spin text-[#8B949E]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <img
            src={userImage}
            alt={userName}
            className="w-8 h-8 rounded-full border-2 border-[#30363D]"
          />
        )}
        <svg
          className={`w-4 h-4 text-[#8B949E] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isMounted && isOpen && !isSigningOut && createPortal(
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {dropdownContent}
        </>,
        document.body
      )}
    </>
  );
}