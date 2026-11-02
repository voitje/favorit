import { configureStore, createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBrands, fetchAnalogues } from './api';
import type { PartsState, Good } from './types';

export const searchBrands = createAsyncThunk<Good[], string, { rejectValue: string }>(
  'parts/searchBrands',
  async (number, { rejectWithValue }) => {
    try {
      return await fetchBrands(number);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchAnalogues = createAsyncThunk<Good[], { number: string; brand: string }, { rejectValue: string }>(
  'parts/searchAnalogues',
  async ({ number, brand }, { rejectWithValue }) => {
    try {
      return await fetchAnalogues(number, brand);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: PartsState = {
  searchNumber: '',
  brands: [],
  selectedBrand: null,
  analogues: [],
  step: 1,
  loading: false,
  error: null,
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.searchNumber = '';
      state.brands = [];
      state.selectedBrand = null;
      state.analogues = [];
      state.step = 1;
      state.error = null;
    },
    backToBrands: (state) => {
      state.step = 1;
      state.analogues = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBrands.fulfilled, (state, action: PayloadAction<Good[]>) => {
        state.loading = false;
        state.brands = action.payload;
        state.searchNumber = action.meta.arg;
        if (action.payload.length > 0) state.step = 1;
      })
      .addCase(searchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(searchAnalogues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnalogues.fulfilled, (state, action: PayloadAction<Good[]>) => {
        state.loading = false;
        state.analogues = action.payload;
        state.step = 2;
        state.selectedBrand = action.meta.arg.brand;
      })
      .addCase(searchAnalogues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const { resetSearch, backToBrands } = partsSlice.actions;

export const store = configureStore({
  reducer: {
    parts: partsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;