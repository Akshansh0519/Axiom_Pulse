import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { updatePrice } from '@/store/slices/tokensSlice';
import { Token } from '@/types/token';

export function useRealtimePrices(tokens: Token[]) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tokens.length) return;

    const interval = setInterval(() => {
      tokens.forEach(token => {
        const priceChangePercent = (Math.random() - 0.5) * 0.1;
        const newPrice = (parseFloat(token.priceUsd) * (1 + priceChangePercent)).toFixed(6);
        
        dispatch(updatePrice({
          id: token.id,
          priceUsd: newPrice,
          priceChange: {
            m5: token.priceChange.m5 + (Math.random() - 0.5) * 5,
            h1: token.priceChange.h1 + (Math.random() - 0.5) * 3,
            h6: token.priceChange.h6 + (Math.random() - 0.5) * 2,
            h24: token.priceChange.h24 + (Math.random() - 0.5) * 1,
          },
          timestamp: Date.now(),
        }));
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, [tokens, dispatch]);
}