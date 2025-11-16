import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, FilterState, SortKey, SortDirection, PriceUpdate } from '@/types/token';

interface TokensState {
  tokens: Token[];
  filteredTokens: Token[];
  isLoading: boolean;
  error: string | null;
  filters: FilterState;
  sort: {
    key: SortKey;
    direction: SortDirection;
  };
  isConnected: boolean;
  lastSortTime: number; // ADD THIS
}

const initialState: TokensState = {
  tokens: [],
  filteredTokens: [],
  isLoading: true,
  error: null,
  filters: {
    category: 'all',
    minVolume: 0,
    minLiquidity: 0,
    searchQuery: '',
  },
  sort: {
    key: 'volume.h24',
    direction: 'desc',
  },
  isConnected: false,
  lastSortTime: 0, // ADD THIS
};

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

function applyFiltersAndSort(state: TokensState, forceSort = false) {
  // THROTTLE SORTING - Only sort every 2 seconds unless forced
  const now = Date.now();
  const shouldSort = forceSort || (now - state.lastSortTime > 2000);
  
  if (!shouldSort) {
    return; // Skip sorting if too soon
  }

  state.lastSortTime = now;

  // START WITH FRESH COPY
  let filtered = [...state.tokens];

  // FILTER: Category
  if (state.filters.category !== 'all') {
    filtered = filtered.filter(token => token.category === state.filters.category);
  }

  // FILTER: Minimum Volume
  if (state.filters.minVolume > 0) {
    filtered = filtered.filter(token => token.volume.h24 >= state.filters.minVolume);
  }

  // FILTER: Minimum Liquidity
  if (state.filters.minLiquidity > 0) {
    filtered = filtered.filter(token => token.liquidity.usd >= state.filters.minLiquidity);
  }

  // FILTER: Search Query
  if (state.filters.searchQuery && state.filters.searchQuery.trim() !== '') {
    const query = state.filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(token =>
      token.baseToken.symbol.toLowerCase().includes(query) ||
      token.baseToken.name.toLowerCase().includes(query) ||
      token.pairAddress.toLowerCase().includes(query)
    );
  }

  // SORT: Apply sorting
  filtered.sort((a, b) => {
    const aValue = getNestedValue(a, state.sort.key);
    const bValue = getNestedValue(b, state.sort.key);

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return state.sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return state.sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  state.filteredTokens = filtered;
}

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.isLoading = false;
      state.error = null;
      applyFiltersAndSort(state, true); // Force sort on initial load
    },

    updatePrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { id, priceUsd, priceChange, marketCap, volume } = action.payload;
      
      // Update tokens array (NO MAPPING - direct mutation for performance)
      const tokenIndex = state.tokens.findIndex(t => t.id === id);
      if (tokenIndex !== -1) {
        const token = state.tokens[tokenIndex];
        const currentPrice = parseFloat(token.priceUsd);
        const newPrice = parseFloat(priceUsd);
        const direction = newPrice > currentPrice ? 'up' : newPrice < currentPrice ? 'down' : null;

        state.tokens[tokenIndex] = {
          ...token,
          priceUsd,
          marketCap: marketCap !== undefined ? marketCap : token.marketCap,
          volume: volume || token.volume,
          priceChange: {
            ...token.priceChange,
            ...priceChange,
          },
          priceDirection: direction,
          lastUpdate: action.payload.timestamp,
        };
      }

      // Update filtered tokens
      const filteredIndex = state.filteredTokens.findIndex(t => t.id === id);
      if (filteredIndex !== -1) {
        const token = state.filteredTokens[filteredIndex];
        const currentPrice = parseFloat(token.priceUsd);
        const newPrice = parseFloat(priceUsd);
        const direction = newPrice > currentPrice ? 'up' : newPrice < currentPrice ? 'down' : null;

        state.filteredTokens[filteredIndex] = {
          ...token,
          priceUsd,
          marketCap: marketCap !== undefined ? marketCap : token.marketCap,
          volume: volume || token.volume,
          priceChange: {
            ...token.priceChange,
            ...priceChange,
          },
          priceDirection: direction,
          lastUpdate: action.payload.timestamp,
        };
      }

      // THROTTLED RE-SORT (every 2 seconds instead of every update)
      applyFiltersAndSort(state, false);
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFiltersAndSort(state, true); // Force sort when filter changes
    },

    setSort: (state, action: PayloadAction<{ key: SortKey }>) => {
      // Toggle direction if same key, otherwise set to desc
      if (state.sort.key === action.payload.key) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.key = action.payload.key;
        state.sort.direction = 'desc';
      }
      
      applyFiltersAndSort(state, true); // Force sort when sort changes
    },

    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  setTokens,
  updatePrice,
  setLoading,
  setError,
  setFilters,
  setSort,
  setConnectionStatus,
} = tokensSlice.actions;

export default tokensSlice.reducer;