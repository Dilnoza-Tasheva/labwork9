
import Modal from '../../components/UI/Modal/Modal.tsx';
import { useCallback, useEffect, useState } from 'react';
import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { ICategory, ITransaction, ITransactionMutation } from '../../types';
import { selectCategories, selectFetchCategoriesLoading } from '../../store/slices/CategorySlice/CategorySlice.ts';
import { selectTransactions } from '../../store/slices/TransactionsSlice/TransactionsSlice.ts';
import {
  createTransaction, deleteOneTransaction,
  editTransaction,
  fetchAllTransactions
} from '../../store/thunks/TransactionsThunks/TransactionsThunks.ts';
import dayjs from 'dayjs';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { fetchAllCategories } from '../../store/thunks/CategoryThunks/CategoryThunks.ts';
import { useLocation, useNavigate } from 'react-router-dom';


const Home = () => {
  const dispatch = useAppDispatch();
  const categories: ICategory[] = useAppSelector(selectCategories);
  const transactions: ITransaction[] = useAppSelector(selectTransactions);
  const isFetchLoading = useAppSelector(selectFetchCategoriesLoading);

  const [isEdit, setIsEdit] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchTransactionsAndCategories = useCallback(async() => {
    await dispatch(fetchAllTransactions());
    await dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    void fetchTransactionsAndCategories();
  }, [fetchTransactionsAndCategories]);

  const showModal = location.pathname === '/add';

  const addNewTransaction = async (transaction: ITransactionMutation) => {
    await dispatch(createTransaction(transaction));
    navigate('/');
    await dispatch(fetchAllTransactions());
  };

  const updateTransaction = async (updatedTransaction: ITransactionMutation) => {
    if (editingTransaction) {
      await dispatch(editTransaction({ transactionId: editingTransaction.id, transaction: updatedTransaction }));
      setEditingTransaction(null);
      setIsEdit(false);
      navigate('/');
      await dispatch(fetchAllTransactions());
    }
  };

  const deleteTransaction = async(transactionId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this?');
    if (confirmed) {
      await dispatch(deleteOneTransaction(transactionId));
      dispatch(fetchAllTransactions());
    }
  };

  const showEditModal = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsEdit(true);
    navigate('/add');
  };

  const closeModalWindow = () => {
    setIsEdit(false);
    setEditingTransaction(null);
    navigate('/');
  };

  const totalAmount = transactions.reduce((acc, transaction) => {
    const category = categories.find((c) => c.id === transaction.categoryId);
    if (!category) return acc;

    return acc + (transaction.type === 'income' ? transaction.amount: - transaction.amount);
  }, 0);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5>Transactions</h5>
        <span>Total: {totalAmount} KGS</span>
      </div>

      {isFetchLoading ? (
        <Spinner/>
      ) : (
        <ul className="list-group mt-3">
          {transactions
            .filter(transaction => {
              const categoryIds = categories.map(category => category.id);
              return categoryIds.includes(transaction.categoryId);
            })
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((transaction) => {
              const category = categories.find((c) => c.id === transaction.categoryId);

              return (
                <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</strong>
                    <br/>
                    <span>{category?.name || 'Unknown Category'}</span>
                    <br/>
                    <span>{transaction.amount !== undefined ?  transaction.amount : 'No amount'}</span>
                  </div>
                  <div>
                    <button onClick={() => showEditModal(transaction)} className="btn btn-sm btn-outline-success me-2">Edit</button>
                    <button onClick={() => deleteTransaction(transaction.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                </li>
              );
            })}
    </ul>
  )
}

  <Modal
    show={showModal}
    title={isEdit ? 'Edit Transaction' : 'Add Transaction'}
    closeModal={closeModalWindow}
    defaultModalButton={false}
  >
    <TransactionForm
      addNewTransaction={isEdit ? updateTransaction : addNewTransaction}
      existingTransaction={isEdit && editingTransaction ? editingTransaction : undefined}
      categories={categories}/>
  </Modal>
</>
)
  ;
};

export default Home;