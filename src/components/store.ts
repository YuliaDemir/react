import { configureStore } from '@reduxjs/toolkit';

import selectedReducer from '../shared/state/slices/selected-slice';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
