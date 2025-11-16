import { Token } from '@/types/token';

const SYMBOLS = ['PEPE', 'SHIB', 'DOGE', 'WOJAK', 'APE', 'BONK', 'FLOKI', 'BABYDOGE', 'ELON', 'SAMO'];
const BASES = ['ETH', 'USDT', 'USDC', 'BNB', 'SOL'];

function generateRandomAddress(): string {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

function getRandomCategory(): Token['category'] {
  const categories: Token['category'][] = ['new-pairs', 'final-stretch', 'migrated'];
  return categories[Math.floor(Math.random() * categories.length)];
}

function generateToken(index: number): Token {
  const baseSymbol = SYMBOLS[index % SYMBOLS.length];
  const quoteSymbol = BASES[Math.floor(Math.random() * BASES.length)];
  const price = Math.random() * 10;
  const volume24h = Math.random() * 1000000;
  const liquidity = Math.random() * 500000;
  const age = Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000; // Within last 7 days

  return {
    id: `token-${index}`,
    pairAddress: generateRandomAddress(),
    baseToken: {
      symbol: baseSymbol,
      name: `${baseSymbol} Token`,
      address: generateRandomAddress(),
    },
    quoteToken: {
      symbol: quoteSymbol,
      name: `${quoteSymbol} Token`,
      address: generateRandomAddress(),
    },
    priceUsd: price.toFixed(8),
    priceNative: (price / 2000).toFixed(8),
    volume: {
      h24: volume24h,
      h6: volume24h * 0.25,
      h1: volume24h * 0.05,
      m5: volume24h * 0.005,
    },
    priceChange: {
      h24: (Math.random() - 0.5) * 100,
      h6: (Math.random() - 0.5) * 50,
      h1: (Math.random() - 0.5) * 20,
      m5: (Math.random() - 0.5) * 5,
    },
    liquidity: {
      usd: liquidity,
      base: liquidity * 0.5,
      quote: liquidity * 0.5,
    },
    fdv: liquidity * (10 + Math.random() * 90),
    marketCap: liquidity * (5 + Math.random() * 45),
    pairCreatedAt: age,
    info: {
      imageUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${baseSymbol}`,
      websites: [
        { url: `https://${baseSymbol.toLowerCase()}.example.com` },
      ],
      socials: [
        { type: 'twitter', url: `https://twitter.com/${baseSymbol.toLowerCase()}` },
        { type: 'telegram', url: `https://t.me/${baseSymbol.toLowerCase()}` },
      ],
    },
    category: getRandomCategory(),
  };
}

export function generateMockTokens(count: number = 50): Token[] {
  return Array.from({ length: count }, (_, i) => generateToken(i));
}

export async function fetchMockTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return generateMockTokens(50);
}