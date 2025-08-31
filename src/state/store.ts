import { configureStore } from '@reduxjs/toolkit';

import selectedColomnsReducer from './slice-colomns';
import yearSearchReducer from './slice-year-search';

export const store = configureStore({
  reducer: {
    selectedColomns: selectedColomnsReducer,
    yearSearch: yearSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
