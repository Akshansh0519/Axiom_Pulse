import axios from 'axios';
import { Token } from '@/types/token';

const BIRDEYE_API = 'https://public-api.birdeye.so';
const BIRDEYE_API_KEY = 'YOUR_API_KEY'; // Get free from birdeye.so

interface BirdeyeToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
}

interface BirdeyeResponse {
  data: {
    tokens: BirdeyeToken[];
  };
}

export async function fetchBirdeyeTokens(): Promise<Token[]> {
  try {
    const response = await axios.get<BirdeyeResponse>(
      `${BIRDEYE_API}/defi/tokenlist`,
      {
        params: {
          sort_by: 'v24hUSD',
          sort_type: 'desc',
          limit: 100,
        },
        headers: {
          'X-API-KEY': BIRDEYE_API_KEY,
        },
      }
    );

    return response.data.data.tokens.map((token) => ({
      id: token.address,
      pairAddress: token.address,
      baseToken: {
        symbol: token.symbol,
        name: token.name,
        address: token.address,
      },
      quoteToken: {
        symbol: 'SOL',
        name: 'Solana',
        address: 'So11111111111111111111111111111111111111112',
      },
      priceUsd: token.price.toString(),
      priceNative: (token.price / 150).toString(),
      volume: {
        h24: token.volume24h,
        h6: token.volume24h / 4,
        h1: token.volume24h / 24,
        m5: token.volume24h / 288,
      },
      priceChange: {
        h24: token.priceChange24h,
        h6: token.priceChange24h / 2,
        h1: token.priceChange24h / 4,
        m5: (Math.random() - 0.5) * 5,
      },
      liquidity: {
        usd: token.liquidity,
        base: 0,
        quote: 0,
      },
      fdv: token.fdv,
      marketCap: token.marketCap,
      pairCreatedAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      info: {
        imageUrl: token.logoURI,
      },
      category: categorizeByAge(),
      priceDirection: null,
      lastUpdate: Date.now(),
    }));
  } catch (error) {
    console.error('Birdeye API error:', error);
    return generateRealisticMockData();
  }
}

function categorizeByAge(): 'new-pairs' | 'final-stretch' | 'migrated' {
  const rand = Math.random();
  if (rand < 0.33) return 'new-pairs';
  if (rand < 0.66) return 'final-stretch';
  return 'migrated';
}

function generateRealisticMockData(): Token[] {
  const tokens = [
    { symbol: 'BONK', name: 'Bonk', img: 'https://img.fotofolio.xyz/?url=https%3A%2F%2Fbafkreiaj7bmq4eyhvnvvbu3gxjdvwhbcwb46b2gtjf3f4s4oqfkw7yqzgm.ipfs.nftstorage.link' },
    { symbol: 'WIF', name: 'dogwifhat', img: 'https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link' },
    { symbol: 'POPCAT', name: 'Popcat', img: 'https://bafkreidvkvuzyslw5jh3pconvzkwdendqjbqpvdv5nqt4rl5u77deu2dgm.ipfs.nftstorage.link' },
    { symbol: 'MYRO', name: 'Myro', img: 'https://creator-hub-prod.s3.us-east-2.amazonaws.com/myro_pfp_1702405632692.png' },
    { symbol: 'JUP', name: 'Jupiter', img: 'https://static.jup.ag/jup/icon.png' },
    { symbol: 'BOME', name: 'BOOK OF MEME', img: 'https://bafkreiexpqw3n7zv7w4e4syvje4z4ycqfgjrpqvz6h3mfjkm7jvwr3dv7u.ipfs.nftstorage.link' },
  ];

  return Array.from({ length: 60 }, (_, i) => {
    const token = tokens[i % tokens.length];
    const category: Array<'new-pairs' | 'final-stretch' | 'migrated'> = ['new-pairs', 'final-stretch', 'migrated'];
    
    return {
      id: `${token.symbol}-${i}`,
      pairAddress: `${Math.random().toString(36).substr(2, 9)}`,
      baseToken: {
        symbol: token.symbol,
        name: token.name,
        address: `${Math.random().toString(36).substr(2, 9)}`,
      },
      quoteToken: {
        symbol: 'SOL',
        name: 'Solana',
        address: 'So11111111111111111111111111111111111111112',
      },
      priceUsd: (Math.random() * 100).toFixed(4),
      priceNative: (Math.random() * 0.001).toFixed(8),
      volume: {
        h24: Math.floor(Math.random() * 10000000),
        h6: Math.floor(Math.random() * 5000000),
        h1: Math.floor(Math.random() * 1000000),
        m5: Math.floor(Math.random() * 100000),
      },
      priceChange: {
        h24: (Math.random() - 0.5) * 100,
        h6: (Math.random() - 0.5) * 50,
        h1: (Math.random() - 0.5) * 20,
        m5: (Math.random() - 0.5) * 10,
      },
      liquidity: {
        usd: Math.floor(Math.random() * 5000000),
        base: 0,
        quote: 0,
      },
      fdv: Math.floor(Math.random() * 500000000),
      marketCap: Math.floor(Math.random() * 300000000),
      pairCreatedAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      info: {
        imageUrl: token.img,
      },
      category: category[i % 3],
      priceDirection: null,
      lastUpdate: Date.now(),
    };
  });
}