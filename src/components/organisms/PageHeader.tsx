'use client';

export function PageHeader() {
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-white">Axiom Pulse</h1>
            <span className="px-2 py-0.5 text-xs font-medium bg-green/20 text-green rounded">
              Live
            </span>
          </div>
          <p className="mt-2 text-text-secondary">
            Real-time token discovery and trading intelligence
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-green" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <span className="text-text-tertiary">24h Volume:</span>
          <span className="text-white font-semibold">$142.5M</span>
        </div>
      </div>
    </div>
  );
}