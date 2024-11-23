export interface ICategory {
  id: string;
  name: string;
  type: string;
}

export type ICategoryMutation = Omit<ICategory, 'id'>

export interface CategoriesList {
  [id: string]: ICategoryMutation;
}

export interface ITransaction {
  id: string;
  amount: number;
  createdAt: string;
  type: string;
  categoryId: string;
}

export type ITransactionMutation = Omit<ITransaction, 'id'>

export interface TransactionsList {
  [id: string]: ITransactionMutation;
}