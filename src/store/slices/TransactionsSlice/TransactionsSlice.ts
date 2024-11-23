import { ITransaction, ITransactionMutation } from '../../../types';
import { RootState } from '../../../app/store.ts';
import { createSlice} from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteOneTransaction, editTransaction,
  fetchAllTransactions
} from '../../thunks/TransactionsThunks/TransactionsThunks.ts';

interface TransactionState {
  transactions: ITransaction[];
  oneTransaction: ITransactionMutation | null;
  isCreateLoading: boolean;
  isFetchLoading: boolean;
  isDeleteLoading: boolean | string;
  isEditLoading: boolean;
}

const initialState:  TransactionState = {
  transactions: [],
  oneTransaction: null,
  isCreateLoading: false,
  isFetchLoading: false,
  isDeleteLoading: false,
  isEditLoading: false,
};

export const selectFetchTransactionsLoading = (state: RootState) => state.transactions.isFetchLoading;
export const selectTransactions = (state: RootState) => state.transactions.transactions;

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isFetchLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOneTransaction.pending, (state, {meta}) => {
        state.isDeleteLoading = meta.arg;
      })
      .addCase(deleteOneTransaction.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOneTransaction.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state) => {
        state.isEditLoading = false;
        state.oneTransaction = null;
      })
      .addCase(editTransaction.rejected, (state) => {
        state.isEditLoading = false;
      })
    ;
  }
});

export const TransactionsReducer = transactionsSlice.reducer;