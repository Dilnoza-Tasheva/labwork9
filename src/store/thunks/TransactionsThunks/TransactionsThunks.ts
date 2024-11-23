import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ITransaction,
  ITransactionMutation,
  TransactionsList
} from '../../../types';
import axiosApi from '../../../axiosApi.ts';

export const createTransaction = createAsyncThunk<void, ITransactionMutation>(
  'transactions/createTransaction',
  async (transaction) => {
    await axiosApi.post('transactions.json', { ...transaction });
  }
);

export const fetchAllTransactions = createAsyncThunk<ITransaction[], void>(
  'transactions/fetchAllTransactions',
  async () => {
    const response = await axiosApi<TransactionsList | null>('transactions.json');
    const transactionsList = response.data;

    if (transactionsList === null) {
      return [];
    }

    const categories = Object.keys(transactionsList).map((id) => ({
      ...transactionsList[id],
      id,
    }));

    return categories;
  }
);

export const deleteOneTransaction = createAsyncThunk<void, string>(
  'categories/deleteOneTransaction',
  async (transactionId) => {
    await axiosApi.delete(`transactions/${transactionId}.json`);
  }
);


export const editTransaction = createAsyncThunk<void, {transactionId: string; transaction: ITransactionMutation}>(
  'categories/editTransaction',
  async({transactionId, transaction}) => {
    await axiosApi.put(`transactions/${transactionId}.json`, {...transaction});
  }
);