export type SortKey = 
  | 'priceUsd'
  | 'priceNative'
  | 'volume.h24' 
  | 'volume.h6'
  | 'volume.h1'
  | 'volume.m5'
  | 'priceChange.h24' 
  | 'priceChange.h6'
  | 'priceChange.h1' 
  | 'priceChange.m5'
  | 'liquidity.usd'
  | 'liquidity.base'
  | 'liquidity.quote'
  | 'marketCap' 
  | 'fdv'
  | 'pairCreatedAt'
  | 'baseToken.symbol'
  | 'baseToken.name';
  
export type SortDirection = 'asc' | 'desc';

export interface Token {
  id: string;
  pairAddress: string;  
  baseToken: {
    symbol: string;
    name: string;
    address: string;
  };
  quoteToken: {
    symbol: string;
    name: string;
    address: string;
  };
  priceUsd: string;
  priceNative: string;
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  info?: {
    imageUrl?: string;
    websites?: { url: string }[];
    socials?: { type: string; url: string }[];
  };
  category: 'new-pairs' | 'final-stretch' | 'migrated';
  priceDirection?: 'up' | 'down' | null;
  lastUpdate?: number;
}
export interface FilterState {
  category: 'all' | 'new-pairs' | 'final-stretch' | 'migrated';
  minVolume: number;
  minLiquidity: number;
  searchQuery: string;
}
export interface PriceUpdate {
  id: string;
  priceUsd: string;
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  marketCap?: number;
  volume?: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  timestamp: number;
}