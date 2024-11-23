import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../store/slices/CategorySlice/CategorySlice.ts';
import { TransactionsReducer } from '../store/slices/TransactionsSlice/TransactionsSlice.ts';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: TransactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;