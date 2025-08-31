import { createSlice } from '@reduxjs/toolkit';

const initialState: { year: number | 'all'; years: (number | 'all')[] } = {
  year: 'all',
  years: [],
};

const yearSearchSlice = createSlice({
  name: 'yearSearch',
  initialState,
  reducers: {
    setYears: (state, action) => {
      state.years = action.payload;
      state.years = ['all', ...action.payload];
    },
    selectYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { selectYear, setYears } = yearSearchSlice.actions;
export default yearSearchSlice.reducer;
