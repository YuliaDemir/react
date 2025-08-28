import { configureStore } from '@reduxjs/toolkit';

import selectedColomnsReducer from './slice-year'

export const store = configureStore({
  reducer: {
    selectedColomns: selectedColomnsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch