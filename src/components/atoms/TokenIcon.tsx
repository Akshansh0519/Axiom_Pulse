'use client';

import Image from 'next/image';
import { useState } from 'react';
import { clsx } from 'clsx';

interface TokenIconProps {
  src?: string;
  symbol: string;
  size?: number;
  className?: string;
}

export function TokenIcon({ src, symbol, size = 32, className }: TokenIconProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={clsx(
          'flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-purple text-white font-bold',
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {symbol.charAt(0)}
      </div>
    );
  }

  return (
    <div className={clsx('relative rounded-full overflow-hidden', className)} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={symbol}
        fill
        sizes={`${size}px`}
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}