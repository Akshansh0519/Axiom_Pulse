'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTokens, setLoading, setError } from '@/store/slices/tokensSlice';
import { fetchTokens } from '@/services/api';

export function useTokens() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.tokens.isLoading);
  const tokens = useAppSelector(state => state.tokens.tokens);

  const { data, error, isLoading: queryLoading } = useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      console.log('🔄 Fetching tokens...');
      const result = await fetchTokens();
      console.log(`✅ Got ${result.length} tokens`);
      return result;
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });

  useEffect(() => {
    dispatch(setLoading(queryLoading));
  }, [queryLoading, dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log('📊 Setting tokens in Redux:', data.length);
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      console.error('❌ Error:', error);
      dispatch(setError(error instanceof Error ? error.message : 'Failed to load'));
    }
  }, [error, dispatch]);

  return {
    tokens,
    isLoading,
    error: error instanceof Error ? error.message : null,
  };
}