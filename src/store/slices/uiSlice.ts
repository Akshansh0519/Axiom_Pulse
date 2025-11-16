import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  modal: {
    isOpen: boolean;
    type: 'details' | 'settings' | null;
    tokenId?: string;
  };
  sortPopover: {
    isOpen: boolean;
    columnId: string | null;
  };
  visibleColumns: string[];
  // ADD THESE TWO PROPERTIES:
  isModalOpen: boolean;
  selectedTokenId: string | null;
}

const initialState: UIState = {
  modal: {
    isOpen: false,
    type: null,
    tokenId: undefined,
  },
  sortPopover: {
    isOpen: false,
    columnId: null,
  },
  visibleColumns: ['name', 'price', 'marketCap', 'volume', 'priceChange'],
  isModalOpen: false,
  selectedTokenId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: 'details' | 'settings'; tokenId?: string }>) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.tokenId = action.payload.tokenId;
      state.isModalOpen = true;
      state.selectedTokenId = action.payload.tokenId || null;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.tokenId = undefined;
      state.isModalOpen = false;
      state.selectedTokenId = null;
    },
    toggleSortPopover: (state, action: PayloadAction<string>) => {
      if (state.sortPopover.columnId === action.payload && state.sortPopover.isOpen) {
        state.sortPopover.isOpen = false;
        state.sortPopover.columnId = null;
      } else {
        state.sortPopover.isOpen = true;
        state.sortPopover.columnId = action.payload;
      }
    },
    closeSortPopover: (state) => {
      state.sortPopover.isOpen = false;
      state.sortPopover.columnId = null;
    },
    setVisibleColumns: (state, action: PayloadAction<string[]>) => {
      state.visibleColumns = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleSortPopover, closeSortPopover, setVisibleColumns } = uiSlice.actions;
export default uiSlice.reducer;