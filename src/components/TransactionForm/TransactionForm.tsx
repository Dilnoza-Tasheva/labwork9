import { ICategory, ITransactionMutation } from '../../types';
import { useEffect, useState } from 'react';

interface Props {
  addNewTransaction: (category: ITransactionMutation) => void;
  existingTransaction?: ITransactionMutation;
  categories: ICategory[];
}

const initialStateForm = {
  amount: 0,
  createdAt: "",
  type: "",
  categoryId: "",
};

const TransactionForm: React.FC<Props> = ({ addNewTransaction, existingTransaction = initialStateForm, categories}) => {
  const [newTransaction, setNewTransaction] = useState<ITransactionMutation>(existingTransaction || {amount: 0, createdAt: ''});

  useEffect(() => {
    if (existingTransaction) {
      setNewTransaction(existingTransaction);
    } else {
      setNewTransaction(initialStateForm);
    }
  }, [existingTransaction]);

  const onChangeClick = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewTransaction((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {type, categoryId, amount} = newTransaction;

    if (!type || !categoryId || amount === 0) {
      return alert('Please fill in all fields!');
    }

    const createdAt = new Date().toISOString();
    addNewTransaction({
      ...newTransaction,
      createdAt,
      amount: Number(newTransaction.amount)
    });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="type">Type: </label>
          <select
            name="type"
            id="type"
            onChange={onChangeClick}
            value={newTransaction.type}
            className="form-select"
          >
            <option value="" disabled>Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            name="categoryId"
            onChange={onChangeClick}
            value={newTransaction.categoryId}
            className="form-select"
          >
            <option value="" disabled>Select Category </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="amount">Amount: </label>
          <input
            type="amount"
            id="amount"
            name="amount"
            onChange={onChangeClick}
            value={newTransaction.amount}
            className="form-control"
          />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-success btn-sm" type="submit">Save</button>
          <button className="btn btn-danger btn-sm">Cancel</button>
        </div>
      </form>
    </>
  );
};

export default TransactionForm;