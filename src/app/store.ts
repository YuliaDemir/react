import { configureStore } from '@reduxjs/toolkit';

import { api } from '@/features/slices/api-slice';

import selectedReducer from '../features/slices/selected-slice';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
